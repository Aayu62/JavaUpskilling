# Hands-On 7: Angular Routing — Guards, Lazy Loading & Route Data

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Intermediate  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 7 transforms the **Student Course Portal** into a full-featured Single Page Application (SPA). This exercise implements advanced client-side routing, including nested child routes under `/courses`, dynamic path parameters (`:id`), search query parameters (`?search=term`), on-demand lazy loading of feature components, route protection via `CanActivate` (`authGuard`), and form protection via `CanDeactivate` (`unsavedChangesGuard`).

---

## 📑 Topics Covered

- **Client-Side Routing Architecture:** Defining routes, child routes, and `<router-outlet>` placeholders.
- **Dynamic Route Parameters:** Extracting URL segment parameters (`:id`) using `ActivatedRoute`.
- **Query Parameter Synchronization:** Updating and reading URL query parameters (`?search=angular`) using `Router.navigate` and `queryParamMap`.
- **Nested Child Routes:** Decoupling parent layout views (`CoursesLayout`) from child content views (`CourseList`, `CourseDetail`).
- **Wildcard 404 Fallback:** Intercepting unknown routes using `path: '**'`.
- **On-Demand Lazy Loading:** Code-splitting application routes to reduce initial bundle download size.
- **Route Guards:** Protecting route access with `CanActivate` and preventing data loss with `CanDeactivate`.

---

## 🛣️ Task 1: Route Configuration, Parameters and Nested Routes

### 1.1 Master Route Manifest (`app.routes.ts`)

Routes are evaluated sequentially in `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail }
    ]
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: StudentProfile
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm)
  },
  {
    path: 'enroll-reactive',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./pages/reactive-enrollment-form/reactive-enrollment-form').then(m => m.ReactiveEnrollmentForm)
  },
  {
    path: '**',
    component: NotFound
  }
];
```

> [!IMPORTANT]
> The wildcard route (`path: '**'`) must **always be declared as the final entry** in the routes array. Angular performs route matching in top-down order; placing wildcard routes higher would intercept all valid routes.

---

### 1.2 Nested Child Routing (`CoursesLayout`)

Nested routing delegates view rendering inside child `<router-outlet>` tags:
- Base path `/courses` renders `CoursesLayoutComponent`.
- Path `/courses` renders `CourseListComponent` inside `CoursesLayout`'s `<router-outlet>`.
- Path `/courses/2` renders `CourseDetailComponent` inside `CoursesLayout`'s `<router-outlet>`.

---

### 1.3 Dynamic Path Parameters (`CourseDetailComponent`)

In `CourseDetailComponent` (`src/app/pages/course-detail/course-detail.ts`), `ActivatedRoute` extracts the dynamic `:id` parameter to load matching course data:

```typescript
export class CourseDetail implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Subscribe to paramMap to handle parameter changes dynamically
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.course = this.courseService.getCourseById(id);
    });
  }
}
```

#### Programmatic Navigation:
Clicking a course card in `CourseListComponent` triggers navigation to the detail route:
```typescript
onCourseClick(courseId: number): void {
  this.router.navigate(['courses', courseId]);
}
```

---

### 1.4 URL Query Parameter Synchronization

In `CourseListComponent` (`src/app/pages/course-list/course-list.ts`), search input state is synchronized with URL query parameters (`/courses?search=angular`):

```typescript
// Read search query parameter on initial load
ngOnInit(): void {
  const search = this.route.snapshot.queryParamMap.get('search');
  if (search) {
    this.searchTerm = search;
  }
}

// Update URL query parameters on user input
onSearchChange(): void {
  this.router.navigate(['courses'], {
    queryParams: { search: this.searchTerm || null }
  });
}
```

---

## 🔒 Task 2: Lazy Loading and Route Guards

### 2.1 On-Demand Lazy Loading

Instead of bundling all components into a single main JavaScript file, lazy loading splits feature components into separate downloadable chunks:

```typescript
{
  path: 'enroll',
  loadComponent: () => import('./pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm)
}
```

#### Verification:
When navigating to `/enroll` for the first time, Chrome DevTools Network tab displays a newly fetched JavaScript chunk file (e.g. `enrollment-form-chunk.js`), demonstrating on-demand downloading.

---

### 2.2 `CanActivate` Route Protection (`authGuard`)

`authGuard` (`src/app/guards/auth.guard.ts`) checks `AuthService` authentication state before permitting access to protected routes (`/profile`, `/enroll`):

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
```

---

### 2.3 `CanDeactivate` Form Loss Prevention (`unsavedChangesGuard`)

`unsavedChangesGuard` (`src/app/guards/unsaved-changes.guard.ts`) intercepts navigation attempts away from unsubmitted, dirty form states:

```typescript
import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentForm> = (component) => {
  if (component.enrollForm && component.enrollForm.dirty && !component.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
```

> **User Experience Benefit:**  
> If a user fills out part of a form (`enrollForm.dirty === true`) and accidentally clicks a navigation link, `unsavedChangesGuard` presents a confirmation modal. Clicking **Cancel** preserves form inputs and halts route navigation.

---

## ✅ Expected Outcomes & Verification Checklist

- [x] Route `/courses/:id` displays matching course details (e.g. `/courses/2`).
- [x] Search input updates URL query string `/courses?search=angular` and filters list.
- [x] Nested routes under `/courses` render inside `CoursesLayoutComponent`'s `<router-outlet>`.
- [x] Invalid URLs (e.g. `/invalid-path`) render `NotFoundComponent` via wildcard route `path: '**'`.
- [x] `/enroll` routes lazy load separate JavaScript chunks on demand.
- [x] `authGuard` protects `/profile` and `/enroll` routes.
- [x] `unsavedChangesGuard` prompts confirmation dialog when navigating away from dirty form state.
