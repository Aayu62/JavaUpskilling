# Hands-On 5: Reactive Forms — FormBuilder, FormGroup, FormArray & Custom Validators

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Intermediate  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 5 rebuilds the enrollment submission functionality as a **Reactive Form** at path `/enroll-reactive`. Reactive forms define the form model programmatically inside the TypeScript component class rather than in the HTML template. This architecture provides higher testability, immutability, synchronous data access, and support for complex dynamic controls. This exercise covers `FormBuilder`, `FormGroup`, `FormControl`, `FormArray`, custom synchronous validators (`noCourseCode`), custom asynchronous validators (`simulateEmailCheck`), and typed form getters.

---

## 📑 Topics Covered

- **Reactive Architecture Setup:** Registering `ReactiveFormsModule` and standalone component imports.
- **Model-Driven Construction:** Utilizing `FormBuilder.group()` to build `FormGroup` and `FormControl` structures.
- **Template Directives:** Binding forms with `[formGroup]` and controls with `formControlName`.
- **Validation Mechanics:** `Validators.requiredTrue` vs `Validators.required`.
- **Custom Synchronous Validators:** Implementing `ValidationErrors | null` functions (`noCourseCode`).
- **Custom Asynchronous Validators:** Promise/Observable-based async validation (`simulateEmailCheck`).
- **Dynamic Repeaters (`FormArray`):** Dynamically adding and removing repeating form controls (`additionalCourses`).
- **Form Value Inspection:** Differentiating `form.value` vs `form.getRawValue()`.
- **Getter Pattern:** Encapsulating `FormArray` type assertions via TypeScript getters.

---

## ⚙️ Task 1: Build a Reactive Form with FormBuilder

### 1.1 Component Scaffolding & Routing

The component was created at `src/app/pages/reactive-enrollment-form/` and registered in `app.routes.ts`:

```typescript
export const routes: Routes = [
  // ... existing routes
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm
  }
];
```

---

### 1.2 Programmatic Form Model Construction

`ReactiveEnrollmentForm` (`src/app/pages/reactive-enrollment-form/reactive-enrollment-form.ts`) injects `FormBuilder` to construct `enrollForm`:

```typescript
ngOnInit(): void {
  this.enrollForm = this.fb.group({
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
    courseId: ['', [Validators.required, noCourseCode]],
    preferredSemester: ['Odd', Validators.required],
    agreeToTerms: [false, Validators.requiredTrue],
    additionalCourses: this.fb.array([])
  });
}
```

> [!NOTE]
> `Validators.requiredTrue` specifically enforces that a checkbox boolean control is explicitly `true`. Standard `Validators.required` only verifies non-null/non-empty values, which would evaluate boolean `false` as a valid present value.

---

### 1.3 Template Binding (`[formGroup]` & `formControlName`)

In `reactive-enrollment-form.html`, HTML elements bind directly to the component model without `ngModel`:

```html
<form [formGroup]="enrollForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="studentName" />
  <input type="email" formControlName="studentEmail" />
  <input type="text" formControlName="courseId" />

  <select formControlName="preferredSemester">
    <option value="Odd">Odd</option>
    <option value="Even">Even</option>
  </select>

  <input type="checkbox" formControlName="agreeToTerms" />

  <button type="submit" [disabled]="enrollForm.invalid">Submit</button>
</form>
```

---

### 1.4 Form Inspection: `form.value` vs. `form.getRawValue()`

When submitting a reactive form, Angular provides two distinct methods to retrieve the form payload:

```typescript
onSubmit(): void {
  // 1. enrollForm.value
  console.log('Form Value (value):', this.enrollForm.value);

  // 2. enrollForm.getRawValue()
  console.log('Form Value (getRawValue):', this.enrollForm.getRawValue());
}
```

| Method | Behavior & Description |
| :--- | :--- |
| **`enrollForm.value`** | Returns an object containing the values of **enabled controls only**. Any control marked as `disabled` (`control.disable()`) is **omitted** from the returned object. |
| **`enrollForm.getRawValue()`** | Returns an object containing the values of **ALL controls**, regardless of whether individual controls are `enabled` or `disabled`. |

---

## 🧪 Task 2: Custom Validators and FormArray for Dynamic Controls

### 2.1 Custom Synchronous Validator (`noCourseCode`)

A synchronous validator receives an `AbstractControl` and synchronously returns a `ValidationErrors` object or `null`:

```typescript
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  if (control.value && String(control.value).toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}
```

Applied to `courseId`:
```typescript
courseId: ['', [Validators.required, noCourseCode]]
```

Template display:
```html
<span *ngIf="enrollForm.get('courseId')?.errors?.['noCourseCode']" class="error-msg">
  Course code starting with XX is not allowed.
</span>
```

---

### 2.2 Custom Asynchronous Validator (`simulateEmailCheck`)

Async validators return a `Promise<ValidationErrors | null>` or `Observable<ValidationErrors | null>`. They fire **only after all synchronous validators pass** to minimize expensive network calls.

```typescript
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value && String(control.value).includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}
```

Applied as the **3rd argument** of the email control array:
```typescript
studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]]
```

Template display:
```html
<span *ngIf="enrollForm.get('studentEmail')?.errors?.['emailTaken']" class="error-msg">
  Email taken
</span>
```

---

### 2.3 Dynamic Control Management with `FormArray`

`FormArray` handles dynamic, repeating form lists (e.g. adding multiple additional courses):

#### Component Operations:
```typescript
// Typed getter for FormArray
get additionalCourses(): FormArray {
  return this.enrollForm.get('additionalCourses') as FormArray;
}

// Add new FormControl to array
addCourse(): void {
  this.additionalCourses.push(this.fb.control('', Validators.required));
}

// Remove FormControl from array by index
removeCourse(index: number): void {
  this.additionalCourses.removeAt(index);
}
```

#### Template Rendering:
```html
<div class="form-group dynamic-section">
  <h3>Additional Courses</h3>
  <button type="button" (click)="addCourse()">Add Another Course</button>

  <div *ngFor="let ctrl of additionalCourses.controls; let i = index">
    <input [formControl]="getControl(ctrl)" placeholder="Course Code" />
    <button type="button" (click)="removeCourse(i)">Remove</button>
  </div>
</div>
```

---

### 2.4 Architectural Pattern: Why Use a Typed Getter for `FormArray`?

> **Why `get additionalCourses()` is preferred over inline casting in templates:**  
> 1. **Prevents Template Bloat:** Inlining type assertions like `(enrollForm.get('additionalCourses') as FormArray).controls` inside HTML template expressions is verbose, error-prone, and difficult to maintain.  
> 2. **Type Safety & IntelliSense:** TypeScript enforces strong return typing (`FormArray`), providing strict compiler type checks and full IDE auto-completion.  
> 3. **Performance & Cleanliness:** Keeps complex casting logic cleanly abstracted inside the TypeScript class, keeping HTML templates simple and declarative.

---

## ✅ Expected Outcomes & Verification Checklist

- [x] Route `/enroll-reactive` registered and accessible in header navigation.
- [x] `ReactiveEnrollmentForm` constructed with `FormBuilder` and bound with `[formGroup]`.
- [x] Entering `XX101` in course ID displays `'Course code starting with XX is not allowed.'`.
- [x] Entering `test@domain.com` triggers async check, rendering `'Email taken'` after 800ms.
- [x] Clicking 'Add Another Course' dynamically pushes new `FormControl` instances into `additionalCourses` `FormArray`.
- [x] Clicking 'Remove' removes specified `FormControl` from array.
- [x] Code contains required comments explaining `value` vs `getRawValue()` and typed getter benefits.
- [x] Submit button enables only when all synchronous and asynchronous validations pass.
