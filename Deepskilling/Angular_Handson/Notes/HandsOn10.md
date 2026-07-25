# Hands-On 10: Unit Testing Angular Applications — Jasmine, Karma & TestBed

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Advanced  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 10 establishes a complete unit testing suite for the **Student Course Portal** using Jasmine, Angular's `TestBed`, `HttpTestingController`, and `@ngrx/store/testing`. This final exercise covers writing automated component unit tests for `@Input()` bindings, `@Output()` event emissions, and lifecycle hooks (`ngOnChanges`), testing HTTP services with mocked network responses, and testing NgRx-connected components using `MockStore` and `store.setState()`.

---

## 📑 Topics Covered

- **Jasmine Testing Fundamentals:** Test suites (`describe`), specs (`it`), assertions (`expect`), and spies (`spyOn`).
- **Angular TestBed:** Configuring isolated testing modules, creating `ComponentFixture`, and querying DOM elements with `By.css()`.
- **Component Interface Testing:** Validating `@Input()` property rendering and spying on `@Output()` `EventEmitter` emissions.
- **Service Unit Testing:** Injecting `provideHttpClientTesting()` and verifying HTTP requests with `HttpTestingController`.
- **NgRx Store Mocking:** Utilizing `provideMockStore()`, `MockStore`, and `store.setState()` to test reactive state components without executing real reducers or effects.

---

## 🧪 Task 1: Testing a Component — `CourseCardComponent`

### 1.1 `TestBed` Setup & Creation (`course-card.spec.ts`)

Located at `src/app/components/course-card/course-card.spec.ts`, `TestBed` configures the standalone component and provides a mock store:

```typescript
describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: { enrollment: { enrolledCourseIds: [] } }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

### 1.2 Testing `@Input()` Rendering

```typescript
it('should render course name in h3 template tag', () => {
  component.course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };
  fixture.detectChanges(); // Triggers change detection to update DOM

  const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
  expect(h3Element.textContent).toContain('Data Structures');
});
```

> [!IMPORTANT]
> Always invoke `fixture.detectChanges()` after mutating component properties in unit tests. Without `fixture.detectChanges()`, Angular does not run change detection, and the DOM remains un-updated.

---

### 1.3 Testing `@Output()` Event Emissions

```typescript
it('should emit enrollRequested event when enroll button is clicked', () => {
  spyOn(component.enrollRequested, 'emit');
  const buttonElement = fixture.debugElement.query(By.css('.btn-enroll')).nativeElement;
  buttonElement.click();
  fixture.detectChanges();

  expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
});
```

---

### 1.4 Testing Lifecycle Hooks (`ngOnChanges`)

```typescript
it('should execute ngOnChanges and log changes', () => {
  spyOn(console, 'log');
  component.ngOnChanges({
    course: new SimpleChange(null, mockCourse, true)
  });

  expect(console.log).toHaveBeenCalledWith('Course input changed');
});
```

---

## ⚡ Task 2: Testing a Service and an NgRx-Connected Component

### 2.1 Service Testing with `HttpTestingController` (`course.service.spec.ts`)

Located at `src/app/services/course.service.spec.ts`, `provideHttpClientTesting()` mocks network requests:

```typescript
describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asserts no unhandled or open HTTP requests remain
  });

  it('should fetch courses list via GET request', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses); // Flushes mock data payload
  });

  it('should handle HTTP error gracefully when API fails', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
```

---

### 2.2 NgRx Store-Connected Component Testing (`course-list.spec.ts`)

Located at `src/app/pages/course-list/course-list.spec.ts`, `provideMockStore()` provides controllable state mocking via `MockStore`:

```typescript
describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const initialState = {
    course: { courses: mockCourses, loading: false, error: null },
    enrollment: { enrolledCourseIds: [1] }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: { get: () => null } }, queryParamMap: of({ get: () => null }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  it('should render course cards matching initial NgRx store state', () => {
    fixture.detectChanges();
    const cardElements = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cardElements.length).toBe(2);
  });

  it('should display loading indicator when store loading state is true', () => {
    // Dynamically update mock store state
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });

    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(loadingElement.textContent).toContain('Loading courses...');
  });
});
```

---

## ✅ Expected Outcomes & Verification Checklist

- [x] Unit test suite created for `CourseCardComponent` (`course-card.spec.ts`).
- [x] Verified component creation, `@Input()` DOM rendering, `@Output()` event emission, and `ngOnChanges()` execution.
- [x] Unit test suite created for `CourseService` (`course.service.spec.ts`) using `provideHttpClientTesting()`.
- [x] `HttpTestingController` verifies GET request URL and method, flushing mock data and verifying zero open requests (`httpMock.verify()`).
- [x] HTTP 500 error response handling tested.
- [x] Unit test suite created for `CourseListComponent` (`course-list.spec.ts`) using `provideMockStore()`.
- [x] Dynamic state testing verified via `store.setState()` displaying loading indicator in DOM.
