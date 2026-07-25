# Hands-On 8: HTTP Client — API Integration, Observables & Interceptors

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Advanced  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 8 connects the **Student Course Portal** to a live backend mock API powered by `json-server` (`db.json` on `http://localhost:3000`). All hardcoded mock arrays were refactored into real asynchronous HTTP requests using Angular's `HttpClient`. Advanced RxJS operators (`map`, `tap`, `catchError`, `retry`, `switchMap`) were applied to handle response stream transformations, retries, and request cancellations. Additionally, three functional HTTP Interceptors (`authInterceptor`, `errorHandlerInterceptor`, `loadingInterceptor`) were registered to handle cross-cutting concerns like authorization headers, global error redirection, and asynchronous loading spinners.

---

## 📑 Topics Covered

- **HTTP Client Configuration:** Registering `provideHttpClient()` and functional interceptors in `app.config.ts`.
- **RESTful CRUD Operations:** Issuing `GET`, `POST`, `PUT`, and `DELETE` requests via `HttpClient`.
- **Cold Observables:** Subscribing to cold HTTP streams using `next`, `error`, and `complete` callbacks.
- **RxJS Operators:** Stream transformation (`map`), side-effect logging (`tap`), resilience retries (`retry`), error handling (`catchError`), and request cancellation (`switchMap`).
- **HTTP Interceptors:** Functional request cloning (`authInterceptor`), global status code interception (`errorHandlerInterceptor`), and global spinner control (`loadingInterceptor`).
- **Reactive Loading Overlay:** Binding `BehaviorSubject` states in templates using the `async` pipe.

---

## 🌐 Task 1: Replace Service Data with HttpClient Calls

### 1.1 Provider Setup & `HttpClient` Injection

In standalone Angular v20, `provideHttpClient()` is configured in `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
    )
  ]
};
```

---

### 1.2 RESTful `CourseService` Implementation

In `src/app/services/course.service.ts`, `HttpClient` issues REST calls to `http://localhost:3000/courses`:

```typescript
@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

---

### 1.3 Subscribing in Component (`CourseListComponent`)

In `src/app/pages/course-list/course-list.ts`, `ngOnInit` subscribes using object observer syntax:

```typescript
this.courseService.getCourses().subscribe({
  next: (courses) => (this.courses = courses),
  error: (err) => (this.errorMessage = err.message),
  complete: () => (this.isLoading = false)
});
```

---

## ⚡ Task 2: RxJS Operators and Error Handling

### 2.1 Applied Operator Pipeline (`getCourses`)

```typescript
getCourses(): Observable<Course[]> {
  return this.http.get<Course[]>(this.apiUrl).pipe(
    retry(2),
    tap((courses) => console.log('Courses loaded:', courses.length)),
    map((courses) => courses.filter((c) => c.credits > 0)),
    catchError((err) => {
      console.error(err);
      return throwError(() => new Error('Failed to load courses. Please try again.'));
    })
  );
}
```

#### Step 85 Explanation: `tap` vs. `map` for Side Effects
> **Why `tap` is preferred over side effects inside `map`:**  
> `tap` is designed specifically for executing side effects (logging, analytics, firing state triggers) without modifying or mutating the stream payload. `map` is designed strictly for data transformation. Inserting side effects into `map` violates functional purity and makes code harder to debug and unit test.

---

### 2.2 Retry Strategy (`retry(2)`) & Fault Tolerance

The `retry(2)` operator automatically resends failed HTTP requests up to **2 times** before allowing `catchError` to execute. This protects the application against transient network blips.

---

### 2.3 Higher-Order Observable Flattening (`switchMap`)

In `EnrollmentService` (`src/app/services/enrollment.service.ts`):

```typescript
loadEnrolledStudentsForSelectedCourse(courseId$: Observable<number>): Observable<any[]> {
  return courseId$.pipe(
    switchMap((courseId) => this.getStudentsByCourse(courseId))
  );
}
```

#### Step 87 Explanation: `switchMap` Cancellation Mechanics
> **Why `switchMap` cancels previous inner Observables:**  
> When a new value arrives on the source Observable (e.g. user rapidly clicks different course IDs), `switchMap` immediately **unsubscribes and cancels** the previous pending inner HTTP request before subscribing to the new one. This prevents race conditions, eliminates wasteful network calls, and guarantees that stale, out-of-order responses do not overwrite the UI.

---

## 🛡️ Task 3: HTTP Interceptors

HTTP Interceptors intercept outgoing requests and incoming responses globally across the application.

```
Request ──► [authInterceptor] ──► [loadingInterceptor] ──► Server
                                                            │
Response ◄── [loadingInterceptor] ◄── [errorHandlerInterceptor] ◄┘
```

---

### 3.1 Authorization Header Interceptor (`authInterceptor`)

Located at `src/app/interceptors/auth.interceptor.ts`, this interceptor clones outgoing requests and injects a Bearer authorization token:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: { Authorization: 'Bearer mocktoken-12345' }
  });
  return next(authReq);
};
```

---

### 3.2 Global Error Handler Interceptor (`errorHandlerInterceptor`)

Located at `src/app/interceptors/error-handler.interceptor.ts`, this interceptor handles HTTP error status codes globally:

```typescript
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/']); // Redirect unauthorized requests to home
      } else if (error.status === 500) {
        console.error('Global Server Error (500):', error.message);
      }
      return throwError(() => error);
    })
  );
};
```

---

### 3.3 Reactive Loading Interceptor & Overlay (`loadingInterceptor`)

1. **`LoadingService` (`src/app/services/loading.service.ts`):** Exposes `isLoading$` `BehaviorSubject`.
2. **`loadingInterceptor` (`src/app/interceptors/loading.interceptor.ts`):**  
   Invokes `loadingService.show()` before request dispatch and uses RxJS `finalize()` to invoke `loadingService.hide()`.

```typescript
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    finalize(() => loadingService.hide()) // Executes on success OR error
  );
};
```

3. **Template Binding (`src/app/app.html`):** Renders a global spinner using the `async` pipe:
```html
<div *ngIf="loadingService.isLoading$ | async" class="global-spinner-overlay">
  <div class="spinner"></div>
</div>
```

---

## ✅ Expected Outcomes & Verification Checklist

- [x] `db.json` created for json-server mock REST API.
- [x] `provideHttpClient()` registered with `withInterceptors` in `app.config.ts`.
- [x] `CourseService` refactored to issue `GET`, `POST`, `PUT`, and `DELETE` HTTP requests.
- [x] `CourseListComponent` subscribes with `next`, `error`, and `complete` callbacks.
- [x] Code includes required comment for Step 85 explaining `tap` vs `map` side effects.
- [x] Code includes required comment for Step 87 explaining `switchMap` cancellation mechanics.
- [x] `retry(2)` retries failed network calls before error emission.
- [x] `authInterceptor` attaches `Authorization: Bearer mocktoken-12345` header to all outgoing requests.
- [x] `errorHandlerInterceptor` redirects 401 errors to `/` and logs 500 errors.
- [x] `loadingInterceptor` and `LoadingService` display global spinner overlay during active HTTP requests.
