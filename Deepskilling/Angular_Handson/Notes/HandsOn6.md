# Hands-On 6: Services & Dependency Injection

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Intermediate  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 6 introduces **Services and Dependency Injection (DI)**, Angular's architecture for centralizing shared business logic, data persistence, and cross-component communication. In this exercise, `CourseService` and `EnrollmentService` were built as application-wide singletons, and `NotificationService` was created to demonstrate component-level hierarchical DI. A central domain interface `Course` was established to ensure compile-time type safety across all components.

---

## 📑 Topics Covered

- **Service Creation & Decorators:** Building reusable logic containers using `@Injectable()`.
- **Dependency Injection Scope:** `providedIn: 'root'` singletons vs component-level `providers: [...]`.
- **Domain Data Models:** Decoupling models using TypeScript interfaces (`Course`).
- **Shared State Store Pattern:** Using a service instance as a single source of truth for component state.
- **Service-to-Service Injection:** Injecting one Angular service into another (`EnrollmentService` ➔ `CourseService`).
- **Hierarchical DI Tree:** Understanding how Angular's injector hierarchy resolves and scopes service instances.

---

## 🏛️ Task 1: Create and Use a Course Service

### 1.1 Domain Interface Model (`course.model.ts`)

A strongly typed `Course` interface was defined at `src/app/models/course.model.ts`:

```typescript
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}
```

---

### 1.2 Singleton Service Pattern (`CourseService`)

Created at `src/app/services/course.service.ts`, `CourseService` centralizes the master course collection and exposes data manipulation APIs:

```typescript
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root' // Singleton provider across root application
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Data Structures', code: 'CSE201', credits: 3, gradeStatus: 'failed' },
    { id: 3, name: 'Database Systems', code: 'DB301', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Operating Systems', code: 'OS401', credits: 3, gradeStatus: 'passed' },
    { id: 5, name: 'Computer Networks', code: 'CN501', credits: 4, gradeStatus: 'pending' }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
```

> [!NOTE]
> **`providedIn: 'root'` Singleton Advantage:**  
> Registering a service with `providedIn: 'root'` registers it with the application root injector. Angular creates **one single shared instance** of the service across the entire SPA lifecycle. All components injecting `CourseService` share the exact same state reference.

---

### 1.3 Shared Component Consumption Verification

Multiple components inject `CourseService` to access and mutate shared data:

1. **`CourseListComponent`:** Calls `this.courseService.getCourses()` to render the catalog grid.
2. **`HomeComponent`:** Accesses `this.courseService.getCourses().length` to dynamically render total available courses in dashboard stat cards.
3. **`CourseSummaryWidget`:** Injects `CourseService` and invokes `addCourse()`. Adding a course immediately reflects in `HomeComponent` and `CourseListComponent` counts without requiring manual event emitters.

---

## 🔗 Task 2: Enrollment Service and Hierarchical DI

### 2.1 Service-to-Service Dependency Injection (`EnrollmentService`)

Created at `src/app/services/enrollment.service.ts`, `EnrollmentService` manages student course enrollments and injects `CourseService` to resolve raw IDs to complete domain objects:

```typescript
import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  // Service-to-Service Dependency Injection
  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    const index = this.enrolledCourseIds.indexOf(courseId);
    if (index !== -1) {
      this.enrolledCourseIds.splice(index, 1);
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map((id) => this.courseService.getCourseById(id))
      .filter((c): c is Course => c !== undefined);
  }
}
```

---

### 2.2 Component State Wiring

- **`CourseCardComponent`:** Injects `EnrollmentService`. Clicking the button invokes `enrollmentService.enroll(id)` or `unenroll(id)`, toggling button labels between `'Enroll'` and `'Unenroll'`.
- **`StudentProfileComponent`:** Injects `EnrollmentService` and binds `enrollmentService.getEnrolledCourses()` to render the active student's enrolled courses list.

---

### 2.3 Hierarchical DI & Component-Scoped Providers

Angular features a **hierarchical dependency injection tree**. While root singletons are shared globally, specifying a service in a component's `providers: [...]` metadata overrides the root injector.

```typescript
// NotificationComponent (src/app/components/notification/notification.ts)
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  providers: [NotificationService], // Component-level provider
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  constructor(public notificationService: NotificationService) {}
}
```

> **Why Component-Level Providers Create Isolated Instances:**  
> Providing `NotificationService` inside `@Component({ providers: [NotificationService] })` instructs Angular's ElementInjector to create a **brand-new, isolated instance** of `NotificationService` exclusively for that component instance and its children. Multiple `<app-notification>` components on the same page will each maintain independent, non-shared state.

---

## ✅ Expected Outcomes & Verification Checklist

- [x] Strongly typed `Course` interface defined in `models/course.model.ts`.
- [x] `CourseService` registered with `providedIn: 'root'` and consumed by `CourseListComponent`, `HomeComponent`, and `CourseSummaryWidget`.
- [x] Adding a course via `CourseSummaryWidget` immediately updates counts across all consuming components.
- [x] `EnrollmentService` injects `CourseService` for service-to-service dependency injection.
- [x] Clicking 'Enroll' on course cards updates `EnrollmentService` state and toggles button label to 'Unenroll'.
- [x] `StudentProfileComponent` renders live list of enrolled courses from `EnrollmentService`.
- [x] `NotificationComponent` includes required comment explaining component-level scoped DI instances.
