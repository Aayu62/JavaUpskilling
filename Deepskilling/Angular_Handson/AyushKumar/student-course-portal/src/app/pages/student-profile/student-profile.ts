import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}
