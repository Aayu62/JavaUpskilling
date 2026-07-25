import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, AsyncPipe } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, AsyncPipe, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input()
  course!: Course;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;
  enrolledIds$: Observable<number[]>;

  constructor(private store: Store) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  get cardStyle() {
    let color = 'grey';
    if (this.course?.gradeStatus === 'passed') {
      color = 'green';
    } else if (this.course?.gradeStatus === 'failed') {
      color = 'red';
    } else if (this.course?.gradeStatus === 'pending') {
      color = 'grey';
    }

    return {
      'border-left': `6px solid ${color}`
    };
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleEnrollment(isCurrentlyEnrolled: boolean): void {
    if (isCurrentlyEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      this.enrollRequested.emit(this.course.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course input changed');
  }
}