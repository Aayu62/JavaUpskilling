# Hands-On 9: State Management — NgRx Store, Actions, Reducers, Effects & Selectors

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Advanced  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 9 migrates the **Student Course Portal** state management architecture from service-based state stores to **NgRx**, implementing the Redux pattern for predictable, immutable global state management. This exercise covers setting up the global NgRx Store, defining feature actions (`loadCourses`, `enrollInCourse`), creating pure reducers, writing memoized selectors (`selectAllCourses`, cross-slice `selectEnrolledCourses`), implementing side-effect handlers with NgRx Effects (`CourseEffects`), and configuring Redux DevTools instrumentation.

---

## 📑 Topics Covered

- **Architectural Shift:** Evaluating when to use NgRx vs. Angular Services.
- **Redux Core Principles:** Single source of truth, read-only state, changes made via pure functions.
- **Action Creators:** Standardizing action dispatch using `createAction` and typed `props<{ ... }>()`.
- **Pure Reducers:** Managing immutable state transitions using `createReducer` and `on()` handlers.
- **Memoized Selectors:** Performance-optimized queries using `createFeatureSelector`, `createSelector`, and cross-slice selectors.
- **Side-Effect Management:** Handling asynchronous HTTP calls using `@ngrx/effects` (`createEffect`, `ofType`).
- **DevTools Integration:** Tracking state timelines with `provideStoreDevtools()`.

---

## 🏬 Task 1: Set Up NgRx Store and Define Course State

### 1.1 Store Registration & DevTools Configuration

In standalone Angular v20, store providers are registered in `src/app/app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer
    }),
    provideEffects([CourseEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
```

---

### 1.2 Course Actions (`course.actions.ts`)

Located at `src/app/store/course/course.actions.ts`, actions represent explicit events:

```typescript
import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);
```

> [!NOTE]
> **Action Type String Naming Convention:**  
> The `[Course]` prefix groups actions by feature slice. This convention enables clean filtering inside Redux DevTools timelines.

---

### 1.3 Course Reducer (`course.reducer.ts`)

Located at `src/app/store/course/course.reducer.ts`, the pure reducer function updates state immutably:

```typescript
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, (state) => ({ ...state, loading: true, error: null })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({ ...state, courses, loading: false, error: null })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
```

---

### 1.4 Course Selectors (`course.selectors.ts`)

Located at `src/app/store/course/course.selectors.ts`, selectors query state efficiently using memoization:

```typescript
export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state?.courses || []
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state?.loading || false
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state?.error || null
);
```

---

### 1.5 Component Integration (`CourseListComponent`)

In `src/app/pages/course-list/course-list.ts`, service subscriptions were replaced with store selection and action dispatch:

```typescript
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectAllCourses);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }
}
```

Template binding (`course-list.html`):
```html
<app-course-card *ngFor="let c of (filteredCourses$ | async)">
```

---

## ⚡ Task 2: NgRx Effects for HTTP and Enrollment State

### 2.1 Asynchronous Effects (`CourseEffects`)

NgRx Effects isolate async side effects (such as HTTP requests) from components and reducers. Located at `src/app/store/course/course.effects.ts`:

```typescript
@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
```

#### Action Lifecycle Trace:
```
1. Component Dispatches:  loadCourses
            │
            ▼
2. Effect Catches Action: loadCourses$ (Fires HTTP Request via CourseService)
            │
            ▼
3. HTTP Returns Data:    Dispatches loadCoursesSuccess({ courses })
            │
            ▼
4. Reducer Immutably Updates State: { courses: [...], loading: false }
            │
            ▼
5. Memoized Selector Emits: selectAllCourses
            │
            ▼
6. Async Pipe Updates View Component
```

---

### 2.2 Enrollment Store & Cross-Slice Selectors

#### Actions & Reducer (`src/app/store/enrollment/`):
```typescript
export const enrollInCourse = createAction('[Enrollment] Enroll In Course', props<{ courseId: number }>());
export const unenrollFromCourse = createAction('[Enrollment] Unenroll From Course', props<{ courseId: number }>());
```

#### Cross-Slice Selector (`enrollment.selectors.ts`):
Cross-slice selectors combine data from multiple independent state features without duplicating data in the store:

```typescript
export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state?.enrolledCourseIds || []
);

// Cross-Slice Selector joining Course State and Enrollment State
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses: Course[], enrolledIds: number[]) =>
    courses.filter((course) => enrolledIds.includes(course.id))
);
```

---

### 2.3 Interactive Component Dispatch (`CourseCardComponent` & `StudentProfileComponent`)

- **`CourseCardComponent`:** Dispatches `enrollInCourse` or `unenrollFromCourse` on button click, using `enrolledIds$` observable with `async` pipe to toggle UI labels between `'Enroll'` and `'Unenroll'`.
- **`StudentProfileComponent`:** Selects `selectEnrolledCourses` cross-slice selector to render the enrolled courses list automatically.

---

## ✅ Expected Outcomes & Verification Checklist

- [x] `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`, and `@ngrx/store-devtools` installed.
- [x] `provideStore`, `provideEffects`, and `provideStoreDevtools` configured in `app.config.ts`.
- [x] Course state created (`loadCourses`, `loadCoursesSuccess`, `loadCoursesFailure`).
- [x] `courseReducer` immutably manages `CourseState`.
- [x] Memoized selectors (`selectAllCourses`, `selectCoursesLoading`, `selectCoursesError`) defined.
- [x] `CourseEffects` intercepts `loadCourses` and dispatches success/failure actions.
- [x] Enrollment store created (`enrollInCourse`, `unenrollFromCourse`, `selectEnrolledIds`).
- [x] Cross-slice selector `selectEnrolledCourses` joins course and enrollment state slices.
- [x] `CourseCardComponent` dispatches actions and binds `enrolledIds$` via `async` pipe.
- [x] `StudentProfileComponent` binds `selectEnrolledCourses` via `async` pipe.
