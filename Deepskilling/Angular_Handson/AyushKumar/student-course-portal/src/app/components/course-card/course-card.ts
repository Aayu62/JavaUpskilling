import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input()
  course!: Course;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;

  constructor(private enrollmentService: EnrollmentService) {}

  get isCurrentlyEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isCurrentlyEnrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
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

  toggleEnrollment(): void {
    if (this.isCurrentlyEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
      this.enrollRequested.emit(this.course.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course input changed');
    console.log('Previous Value:', changes['course']?.previousValue);
    console.log('Current Value:', changes['course']?.currentValue);
  }
}