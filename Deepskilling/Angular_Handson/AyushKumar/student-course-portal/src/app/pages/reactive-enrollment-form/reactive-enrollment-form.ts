import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  if (control.value && String(control.value).toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

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

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

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

  // Step 57 Comment: Typed getters encapsulate FormArray casting in TypeScript instead of performing expensive, unsafe type casting inside HTML templates. This ensures template cleanliness, strong typing, and auto-completion.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  getControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    // Step 52 Comment: enrollForm.value returns an object containing only enabled control values (omitting any disabled controls). In contrast, enrollForm.getRawValue() returns values for ALL controls regardless of whether they are enabled or disabled.
    console.log('Form Value (value):', this.enrollForm.value);
    console.log('Form Value (getRawValue):', this.enrollForm.getRawValue());
    console.log('Form Valid:', this.enrollForm.valid);

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  onReset(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
