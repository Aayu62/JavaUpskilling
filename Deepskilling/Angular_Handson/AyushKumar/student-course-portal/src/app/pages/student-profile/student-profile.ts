import { Component } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  constructor(private enrollmentService: EnrollmentService) {}

  get enrolledCourses(): Course[] {
    return this.enrollmentService.getEnrolledCourses();
  }
}
