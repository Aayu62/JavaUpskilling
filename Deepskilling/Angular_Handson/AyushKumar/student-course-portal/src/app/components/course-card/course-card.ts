import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {

  @Input()
  course!: {
    id: number;
    name: string;
    code: string;
    credits: number | null;
    gradeStatus?: string;
  };

  @Input()
  isEnrolled: boolean = false;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;

  // Getters keep templates clean by encapsulating dynamic class calculation logic in TypeScript
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
  }

  // Dynamic inline styling calculated for [ngStyle] binding based on gradeStatus
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

  onEnrollClick(): void {
    this.isEnrolled = true;
    this.enrollRequested.emit(this.course.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course input changed');
    console.log('Previous Value:', changes['course']?.previousValue);
    console.log('Current Value:', changes['course']?.currentValue);
  }

}