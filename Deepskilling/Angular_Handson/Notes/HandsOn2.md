# Hands-On 2: Data Binding, Lifecycle Hooks & Component Communication

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Beginner  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 2 expands the **Student Course Portal** from a static template layout into a dynamic, reactive application. This hands-on explores the core building blocks of Angular reactivity: all four primary data binding mechanisms, component lifecycle hook management (`ngOnInit`, `ngOnDestroy`, `ngOnChanges`), and parent-child component interaction using `@Input` and `@Output` decorators with `EventEmitter`.

---

## 📑 Topics Covered

- **The Four Binding Types:** Interpolation, Property Binding, Event Binding, and Two-Way Binding (`ngModel`).
- **Component Lifecycle Management:** Initializing data with `ngOnInit()`, teardown/cleanup with `ngOnDestroy()`, and detecting input change cycles with `ngOnChanges()`.
- **Component Communication Architecture:** Passing data down with `@Input()` decorators and raising events up using `@Output()` and `EventEmitter<T>`.
- **Template Directives:** Using structural directives (`*ngIf` and `*ngFor`) alongside custom component inputs and outputs.

---

## ⚡ Task 1: All Four Binding Types

Task 1 demonstrates Angular's data binding syntax within `HomeComponent` (`src/app/pages/home/home.ts` & `home.html`).

### 1.1 Implementation Code

#### TypeScript Component Class (`home.ts`)
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // 1. Interpolation property
  portalName = 'Student Course Portal';

  // 2. Property Binding flag
  isPortalActive = true;

  // 3. Event Binding state message
  message = '';

  // 4. Two-Way Binding property
  searchTerm = '';

  availableCourses = 0;

  ngOnInit(): void {
    this.availableCourses = 12;
    console.log('HomeComponent initialised - course loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
```

#### HTML Template (`home.html`)
```html
<!-- 1. Interpolation (Component -> DOM text) -->
<h1>{{ portalName }}</h1>

<!-- 2. Property Binding (Component state -> DOM property) -->
<!-- 3. Event Binding (DOM event -> Component method execution) -->
<button [disabled]="!isPortalActive" (click)="onEnrollClick()">
  Enroll Now
</button>

<p>{{ message }}</p>

<hr>

<!-- 4. Two-Way Binding (DOM <-> Component sync via ngModel) -->
<input type="text" placeholder="Search courses..." [(ngModel)]="searchTerm">

<p>Searching for: {{ searchTerm }}</p>
```

---

### 1.2 Comprehensive Breakdown of Data Binding Types

| Binding Type | Syntax | Direction | Description & Use Case |
| :--- | :--- | :--- | :--- |
| **Interpolation** | `{{ expression }}` | Component ➔ DOM | Evaluates a TypeScript expression and embeds the resulting string directly into the template HTML. |
| **Property Binding** | `[target]="expression"` | Component ➔ DOM | Dynamically sets a DOM element property or directive input (e.g. `[disabled]="!isPortalActive"`). |
| **Event Binding** | `(target)="statement"` | DOM ➔ Component | Listens for user DOM events (clicks, keypresses, mouse movement) and invokes a component method (`(click)="onEnrollClick()"`). |
| **Two-Way Binding** | `[(ngModel)]="property"` | DOM ↔ Component | Keeps the component state and DOM form control in continuous synchronization. Requires `FormsModule`. |

---

### 1.3 Deep Dive: `[property]` vs `[(ngModel)]`

> [!IMPORTANT]
> **One-Way Property Binding (`[property]`):**  
> Data flows strictly in **one direction** (Component to DOM). When the component property changes, Angular updates the DOM. However, user input or interactions in the DOM do **NOT** modify the TypeScript property.  
> *Example:* `<button [disabled]="!isPortalActive">`

> **Two-Way Data Binding (`[(ngModel)]`):**  
> Data flows in **both directions** (Component to DOM and DOM to Component). Typing into an input field instantly mutates the component property, and updating the component property instantly reflects in the input field.  
> 
> `[(ngModel)]` is syntactically known as the **"banana-in-a-box"** syntax. It is shorthand for combining one-way property binding and event binding:  
> ```html
> <input [ngModel]="searchTerm" (ngModelChange)="searchTerm = $event">
> ```

---

## 🔄 Task 2: Lifecycle Hooks

Lifecycle hooks allow developers to execute custom code at specific operational moments in a component's lifecycle.

```
+-----------------------------------------------------------------------+
|                         Component Lifecycle                           |
|                                                                       |
|  [Constructor] ──► [ngOnChanges] ──► [ngOnInit] ──► [ngOnDestroy]     |
|   Instantiates       Inputs Set      Init Data       Component Unmount|
+-----------------------------------------------------------------------+
```

### 2.1 Applied Lifecycle Hooks & Mechanics

#### 1. `ngOnInit()`
- **Execution Timing:** Invoked once after Angular has initialized all input properties of the component.
- **Use Case:** Executing initialization logic, subscribing to services, and initiating HTTP/data fetch requests.
- **Implementation in `HomeComponent`:**
  ```typescript
  ngOnInit(): void {
    this.availableCourses = 12;
    console.log('HomeComponent initialised - course loaded');
  }
  ```

#### 2. `ngOnDestroy()`
- **Execution Timing:** Invoked immediately before Angular destroys and unmounts the component view from the DOM.
- **Use Case:** Cleaning up resources, clearing timers (`setInterval`/`setTimeout`), and unsubscribing from RxJS Observables to prevent severe memory leaks in SPAs.
- **Implementation in `HomeComponent`:**
  ```typescript
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
  ```
- **Verification:** Navigating away from `Home` to another route (e.g., `/courses`) triggers the `ngOnDestroy` log in the browser console.

#### 3. `ngOnChanges(changes: SimpleChanges)`
- **Execution Timing:** Called whenever an `@Input()` bound property changes. Receives a `SimpleChanges` object containing previous and current values.
- **Implementation in `CourseCardComponent` (`src/app/components/course-card/course-card.ts`):**
  ```typescript
  import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

  export class CourseCard implements OnChanges {
    @Input() course!: { id: number; name: string; code: string; credits: number };

    ngOnChanges(changes: SimpleChanges): void {
      console.log('Course input changed');
      console.log('Previous Value:', changes['course']?.previousValue);
      console.log('Current Value:', changes['course']?.currentValue);
    }
  }
  ```
- **Console Log Output:** When `CourseListComponent` renders multiple `app-course-card` elements, `ngOnChanges` fires for each card on initial binding, logging `undefined` for `previousValue` and the assigned course object for `currentValue`.

---

## 📡 Task 3: `@Input` and `@Output` — Parent-Child Communication

Angular enforces a **unidirectional data flow** architecture:
- **Data down** from Parent to Child via `@Input()` properties.
- **Events up** from Child to Parent via `@Output()` custom events powered by `EventEmitter`.

```
                    +------------------------+
                    |  CourseListComponent   |
                    |        (Parent)        |
                    +------------------------+
                        |                ▲
                        | [course]="c"   | (enrollRequested)="onEnroll($event)"
                        ▼                |
                    +------------------------+
                    |  CourseCardComponent   |
                    |        (Child)         |
                    +------------------------+
```

---

### 3.1 Child Component: `CourseCardComponent`

#### Class (`course-card.ts`)
```typescript
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  // @Input() receives course object from parent component
  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
  };

  // @Output() emits course ID integer event up to parent component
  @Output() enrollRequested = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course input changed');
    console.log('Previous Value:', changes['course']?.previousValue);
    console.log('Current Value:', changes['course']?.currentValue);
  }
}
```

#### Template (`course-card.html`)
```html
<div class="course-card">
  <h3>{{ course.name }}</h3>
  <p><strong>ID:</strong> {{ course.id }}</p>
  <p><strong>Code:</strong> {{ course.code }}</p>
  <p><strong>Credits:</strong> {{ course.credits }}</p>

  <!-- Triggers custom event emission passing course.id payload -->
  <button (click)="enrollRequested.emit(course.id)">
    Enroll
  </button>
</div>
```

---

### 3.2 Parent Component: `CourseListComponent`

#### Class (`course-list.ts`)
```typescript
import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, NgFor, NgIf],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;

  // Master course array dataset
  courses = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 4 },
    { id: 2, name: 'Data Structures', code: 'CSE201', credits: 3 },
    { id: 3, name: 'Database Systems', code: 'DB301', credits: 4 },
    { id: 4, name: 'Operating Systems', code: 'OS401', credits: 3 },
    { id: 5, name: 'Computer Networks', code: 'CN501', credits: 4 }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Parent event handler processing emitted event from child
  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }
}
```

#### Template (`course-list.html`)
```html
<h2>Course List</h2>

<p *ngIf="isLoading">Loading courses...</p>

<div *ngIf="!isLoading">
  <!-- Iterate through courses and bind input/output properties -->
  <app-course-card
    *ngFor="let c of courses"
    [course]="c"
    (enrollRequested)="onEnroll($event)">
  </app-course-card>

  <!-- Conditionally display selected course feedback -->
  <p *ngIf="selectedCourseId">
    Selected course ID: {{ selectedCourseId }}
  </p>
</div>
```

---

## ✅ Expected Outcomes & Verification Checklist

- [x] All 4 data binding types implemented in `HomeComponent` (Interpolation, Property Binding, Event Binding, Two-Way Binding with `ngModel`).
- [x] Typing into search box live-updates searching text display.
- [x] Clicking "Enroll Now" triggers message update.
- [x] `ngOnInit` logs initial course load message on page boot.
- [x] `ngOnDestroy` logs component destruction when navigating away from Home.
- [x] `ngOnChanges` logs previous and current input values for every course card.
- [x] Data flows down from `CourseListComponent` to `CourseCardComponent` via `@Input() course`.
- [x] Clicking "Enroll" button on any card emits event upward via `@Output() enrollRequested`, updating `selectedCourseId` in parent template.
