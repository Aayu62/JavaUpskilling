# Hands-On 4: Template-Driven Forms & Validation

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Intermediate  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 4 introduces **Template-Driven Forms**, Angular's HTML-centric approach for building forms. In this exercise, a **Student Enrollment Request** form was built at path `/enroll`. The form incorporates two-way data binding via `[(ngModel)]`, template reference variables (`#enrollForm="ngForm"`, `#nameCtrl="ngModel"`), built-in validation directives (`required`, `minlength`, `email`), contextual error messages driven by user interaction states (`touched`), automatic CSS state classes (`.ng-invalid.ng-touched`), and form submission/reset routines.

---

## 📑 Topics Covered

- **Template-Driven Architecture:** Registering `FormsModule` and binding form directives.
- **Form Controls & Bindings:** `[(ngModel)]` synchronization with mandatory `name` attributes.
- **Template Reference Variables:** `#enrollForm="ngForm"` for `NgForm` control and `#control="ngModel"` for `NgModel` directive instances.
- **Built-in Validation Directives:** Enforcing rules with `required`, `minlength="3"`, and `email`.
- **Validation UX & State Analysis:** Differentiating between `touched` and `dirty` states for user-friendly error displays.
- **Form CSS State Styling:** Targeting Angular's automatic CSS classes (`.ng-invalid`, `.ng-valid`, `.ng-touched`).
- **Submission & Reset Handling:** Processing `form.value`, evaluating `form.valid`, and resetting state via `resetForm()`.

---

## 📝 Task 1: Build the Enrollment Request Form

### 1.1 Component Scaffolding & Routing

The component was created at `src/app/pages/enrollment-form/` and registered in `app.routes.ts`:

```typescript
export const routes: Routes = [
  // ... existing routes
  {
    path: 'enroll',
    component: EnrollmentForm
  }
];
```

---

### 1.2 Form Structure & Control Bindings

To enable template-driven form features, `FormsModule` is imported in `EnrollmentForm` (`src/app/pages/enrollment-form/enrollment-form.ts`). Each form input utilizes two-way data binding `[(ngModel)]` and a mandatory `name` attribute:

| Field Name | Control Type | Angular Binding | Purpose |
| :--- | :--- | :--- | :--- |
| `studentName` | Text Input | `[(ngModel)]="studentName" name="studentName"` | Binds student full name |
| `studentEmail` | Email Input | `[(ngModel)]="studentEmail" name="studentEmail"` | Binds student email address |
| `courseId` | Number Input | `[(ngModel)]="courseId" name="courseId"` | Binds target course ID number |
| `preferredSemester` | Select Dropdown | `[(ngModel)]="preferredSemester" name="preferredSemester"` | Selection between `Odd` and `Even` semesters |
| `agreeToTerms` | Checkbox | `[(ngModel)]="agreeToTerms" name="agreeToTerms"` | Enforces policy agreement |

> [!IMPORTANT]
> The `name` attribute is **mandatory** for every form control in template-driven forms. Angular uses the `name` value as the property key when building the combined `form.value` JavaScript object.

---

### 1.3 Form Submission Handling

The form element declares a template reference `#enrollForm="ngForm"` and binds the `ngSubmit` event:

```html
<form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)">
  <!-- Form Controls -->
  <button type="submit" [disabled]="enrollForm.invalid">Submit</button>
  <button type="button" (click)="onReset(enrollForm)">Reset</button>
</form>
```

In `EnrollmentForm` component class:
```typescript
onSubmit(form: NgForm): void {
  console.log('Form Value:', form.value);
  console.log('Form Valid:', form.valid);
  if (form.valid) {
    this.submitted = true;
  }
}
```

- **`form.value` Structure:** A JavaScript object mapping control `name` attributes to current values:
  ```json
  {
    "studentName": "John Doe",
    "studentEmail": "john@example.com",
    "courseId": 101,
    "preferredSemester": "Odd",
    "agreeToTerms": true
  }
  ```
- **Submit Button Guard:** `[disabled]="enrollForm.invalid"` prevents submission whenever any control fails validation.

---

## ⚠️ Task 2: Validation and Error Messages

### 2.1 Built-in Validation Directives

Validation attributes were applied to form inputs to enforce domain integrity:
- `studentName`: `required`, `minlength="3"`
- `studentEmail`: `required`, `email`
- `courseId`: `required`
- `agreeToTerms`: `required`

---

### 2.2 Template Reference Variables & Contextual Errors

To access validation states in HTML, template reference variables export `ngModel` (e.g. `#nameCtrl="ngModel"`):

```html
<input
  type="text"
  id="studentName"
  name="studentName"
  [(ngModel)]="studentName"
  required
  minlength="3"
  #nameCtrl="ngModel"
/>

<div *ngIf="nameCtrl.touched && nameCtrl.errors" class="error-container">
  <span *ngIf="nameCtrl.errors?.['required']" class="error-msg">Name is required</span>
  <span *ngIf="nameCtrl.errors?.['minlength']" class="error-msg">Name must be at least 3 characters</span>
</div>
```

---

### 2.3 UX Best Practice: `touched` vs. `dirty`

| Control State Flag | Trigger Condition | Recommended Use Case for Error Messages |
| :--- | :--- | :--- |
| **`touched`** | True once the user focuses on an input field and triggers a `blur` event by clicking/tabbing away. | **Recommended for displaying errors.** Ensures users see validation feedback *after* visiting a field, avoiding disruptive error messages while initially typing. |
| **`dirty`** | True as soon as the user alters the initial field value by typing a single character. | Useful for tracking whether unsaved changes exist in a form before navigating away. |

---

### 2.4 Automatic Angular Form CSS Classes

Angular automatically attaches state classes to form control DOM elements based on interaction:

```
                  +-----------------------------------+
                  | Angular Form CSS Class Matrix     |
                  +-------------------+---------------+
                  | State Flag        | CSS Class     |
                  +-------------------+---------------+
                  | Valid / Invalid   | ng-valid      |
                  |                   | ng-invalid    |
                  | Visited / Unvisited| ng-touched   |
                  |                   | ng-untouched  |
                  | Modified / Clean  | ng-dirty      |
                  |                   | ng-pristine   |
                  +-------------------+---------------+
```

In `enrollment-form.css`, CSS rules target invalid/valid controls that have been touched by the user:

```css
input.ng-invalid.ng-touched,
select.ng-invalid.ng-touched {
  border-color: red;
}

input.ng-valid.ng-touched,
select.ng-valid.ng-touched {
  border-color: green;
}
```

---

### 2.5 Form Reset Procedure

Clicking the Reset button triggers `onReset(enrollForm)`:

```typescript
onReset(form: NgForm): void {
  form.resetForm();
  this.submitted = false;
}
```

Calling `form.resetForm()` performs two critical actions:
1. Clears all input field values.
2. Resets all Angular control states back to `untouched`, `pristine`, and `untouched` validation states, clearing red/green borders and error messages.

---

## ✅ Expected Outcomes & Verification Checklist

- [x] Route `/enroll` registered and accessible via navigation link in layout header.
- [x] `EnrollmentFormComponent` renders form controls for name, email, course ID, semester, and terms checkbox.
- [x] `#enrollForm="ngForm"` template reference binds `onSubmit(enrollForm)`.
- [x] Submit button remains disabled while form is invalid.
- [x] Inputs display red borders (`.ng-invalid.ng-touched`) and contextual error messages on blur when invalid.
- [x] Inputs display green borders (`.ng-valid.ng-touched`) when valid and touched.
- [x] Console logs `form.value` object and `form.valid` boolean flag upon submission.
- [x] Success message banner (`*ngIf="submitted"`) appears after valid submission.
- [x] Reset button invocation clears all form controls and clears validation state via `form.resetForm()`.
