# Hands-On 3: Directives & Pipes — Built-in and Custom

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Beginner  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 3 enhances the **Student Course Portal** with advanced Angular directives and pipes. Directives extend HTML capabilities by manipulating the DOM structure or element attributes dynamically. Pipes transform raw data values directly in templates. This hands-on covers built-in structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`), attribute directives (`[ngClass]`, `[ngStyle]`), a custom configurable hover-highlight directive (`HighlightDirective`), and a custom domain pipe (`CreditLabelPipe`).

---

## 📑 Topics Covered

- **Structural Directives:** Dynamic DOM layout manipulation using `*ngIf`, `*ngIf...else` with `ng-template`, `*ngFor` with `trackBy` performance optimization, and `*ngSwitch`.
- **Attribute Directives:** Conditional CSS class binding (`[ngClass]`) and dynamic inline styling (`[ngStyle]`).
- **Clean Template Design:** Getter encapsulation pattern (`get cardClasses()`) in TypeScript component classes.
- **Custom Attribute Directive:** Event-driven DOM behavior using `@Directive`, `@HostListener`, `@Input`, and `ElementRef`.
- **Custom Pipe:** Value transformation using `PipeTransform`, handling plurals and edge cases, and pure vs. impure pipe mechanics.

---

## 🏗️ Task 1: Structural Directives (`*ngIf`, `*ngFor`, `*ngSwitch`)

Structural directives alter the structure of the DOM tree by adding, removing, or manipulating DOM elements. They are prefixed with an asterisk (`*`).

---

### 1.1 Async Loading & Empty Template (`*ngIf` & `else` Block)

In `CourseListComponent` (`src/app/pages/course-list/course-list.ts`), an `isLoading` boolean property simulates a 1.5-second asynchronous network call:

```typescript
export class CourseList implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
```

In `course-list.html`, `*ngIf` renders a loading text initially, and an `*ngIf...else` block displays either the course list or an empty template (`<ng-template #noCourses>`):

```html
<!-- Show loading text while isLoading is true -->
<p *ngIf="isLoading">Loading courses...</p>

<div *ngIf="!isLoading">
  <!-- Render course list if courses array is non-empty; otherwise render #noCourses template -->
  <ng-container *ngIf="courses.length > 0; else noCourses">
    <app-course-card
      *ngFor="let c of courses; let i = index; trackBy: trackByCourseId"
      [course]="c"
      (enrollRequested)="onEnroll($event)">
    </app-course-card>
  </ng-container>

  <ng-template #noCourses>
    <p>No courses available.</p>
  </ng-template>
</div>
```

> [!NOTE]
> **Difference between `*ngIf...else` and CSS `display: none`:**  
> `*ngIf` physically adds or removes elements from the DOM tree. When `*ngIf` evaluates to `false`, the element and its child components are unmounted and completely destroyed. CSS `display: none` leaves elements in the DOM tree, consuming browser memory.

---

### 1.2 List Iteration & `trackBy` Performance Optimization

The `*ngFor` directive loops over the `courses` array. To optimize DOM rendering performance, a `trackBy` function is attached:

```typescript
trackByCourseId(index: number, course: any): number {
  return course.id;
}
```

#### Why `trackBy` Improves Performance:
- **Without `trackBy`:** When any item in an array changes or reorders, Angular cannot identify which specific DOM elements correspond to which data objects. As a result, Angular destroys **all** DOM elements in the list and recreates them from scratch, causing layout thrashing and poor performance.
- **With `trackBy`:** Angular uses the returned unique key (`course.id`) to track individual elements. When array items change or reorder, Angular reuses existing DOM nodes and updates only the modified elements.

---

### 1.3 Conditional Badging (`*ngSwitch`)

Each course object contains a `gradeStatus` property (`'passed'`, `'failed'`, or `'pending'`). In `CourseCardComponent` (`course-card.html`), `*ngSwitch` dynamically renders status badges:

```html
<div [ngSwitch]="course.gradeStatus" class="status-container">
  <span *ngSwitchCase="'passed'" class="badge badge-passed">Passed</span>
  <span *ngSwitchCase="'failed'" class="badge badge-failed">Failed</span>
  <span *ngSwitchCase="'pending'" class="badge badge-pending">Pending</span>
  <span *ngSwitchDefault class="badge badge-pending">Pending</span>
</div>
```

---

## 🎨 Task 2: Attribute Directives — `ngClass` and `ngStyle`

Attribute directives change the appearance or behavior of existing DOM elements without modifying the DOM hierarchy.

---

### 2.1 Clean Getter Encapsulation Pattern (`cardClasses`)

Instead of writing complex boolean expressions inside HTML templates, best practice dictates delegating dynamic class logic to a TypeScript getter in `CourseCardComponent` (`src/app/components/course-card/course-card.ts`):

```typescript
export class CourseCard {
  @Input() course!: { id: number; name: string; code: string; credits: number | null; gradeStatus?: string };
  @Input() isEnrolled: boolean = false;
  isExpanded: boolean = false;

  // Getter encapsulates object binding for [ngClass]
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
  }
}
```

In `course-card.html`, the clean getter is bound to `[ngClass]`:
```html
<div class="course-card" [ngClass]="cardClasses">
```

> **Why Getters Keep Templates Clean:**  
> 1. Prevents bloated, unreadable inline logic inside template attributes.  
> 2. Enables type checking and unit testability for CSS condition rules inside TypeScript.  
> 3. Keeps HTML declarative and focused on presentation.

---

### 2.2 Dynamic Inline Border Styling (`[ngStyle]`)

In `CourseCardComponent`, a getter computes dynamic inline styles based on `gradeStatus`:

```typescript
get cardStyle() {
  let color = 'grey';
  if (this.course?.gradeStatus === 'passed') color = 'green';
  else if (this.course?.gradeStatus === 'failed') color = 'red';
  else if (this.course?.gradeStatus === 'pending') color = 'grey';

  return {
    'border-left': `6px solid ${color}`
  };
}
```

Bound in template:
```html
<div class="course-card" [ngClass]="cardClasses" [ngStyle]="cardStyle">
```

---

## 🛠️ Task 3: Custom Directive and Custom Pipe

---

### 3.1 Custom Attribute Directive (`HighlightDirective`)

Created at `src/app/directives/highlight.directive.ts`, `HighlightDirective` listens to host element hover events and applies a configurable background highlight color.

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Configurable highlight color with default fallback 'yellow'
  @Input() appHighlight: string = 'yellow';

  private originalColor: string = '';

  constructor(private el: ElementRef) {}

  // Listens to host element mouseenter event
  @HostListener('mouseenter') onMouseEnter() {
    this.originalColor = this.el.nativeElement.style.backgroundColor || '';
    this.highlight(this.appHighlight || 'yellow');
  }

  // Listens to host element mouseleave event
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.originalColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

#### Application in Template:
```html
<!-- Applied with default or custom highlight color -->
<app-course-card
  *ngFor="let c of courses; trackBy: trackByCourseId"
  [course]="c"
  [appHighlight]="'yellow'">
</app-course-card>
```

> **Key Concept:** `@HostListener` automatically binds host element events without needing manual `addEventListener`/`removeEventListener` calls. Angular handles subscriber memory cleanup automatically on directive destruction.

---

### 3.2 Custom Pipe (`CreditLabelPipe`)

Created at `src/app/pipes/credit-label.pipe.ts`, `CreditLabelPipe` transforms numeric credit counts into formatted strings.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    if (value === 1) {
      return '1 Credit';
    }
    return `${value} Credits`;
  }
}
```

#### Application & Transformation Results:
```html
<p><strong>Credits:</strong> {{ course.credits | creditLabel }}</p>
```

| Input Value | Pipe Output Expression |
| :--- | :--- |
| `1` | `'1 Credit'` |
| `3` | `'3 Credits'` |
| `4` | `'4 Credits'` |
| `null` / `0` | `'No Credits'` |

> [!TIP]
> **Pure vs. Impure Pipes:**  
> Pipes are **pure by default** (`pure: true`). Angular only re-evaluates a pure pipe when it detects a change to the primitive input value (e.g. number, string) or object reference. Impure pipes (`pure: false`) re-run on every digest cycle and should be used cautiously to avoid performance overhead.

---

## ✅ Expected Outcomes & Verification Checklist

- [x] `isLoading` displays `<p>Loading courses...</p>` for 1.5 seconds before rendering course grid.
- [x] `*ngFor` renders course list utilizing `trackByCourseId`.
- [x] `*ngSwitch` renders green 'Passed', red 'Failed', and grey 'Pending' badges based on `gradeStatus`.
- [x] `*ngIf...else` template (`#noCourses`) ready for empty array state.
- [x] `[ngClass]="cardClasses"` applies `card--enrolled`, `card--full`, and `expanded` dynamic classes.
- [x] `[ngStyle]="cardStyle"` applies dynamic colored left border based on `gradeStatus`.
- [x] `HighlightDirective` toggles background color on `mouseenter`/`mouseleave` via `@HostListener`.
- [x] `CreditLabelPipe` transforms credit numbers into formatted strings (`'1 Credit'`, `'3 Credits'`, `'No Credits'`).
