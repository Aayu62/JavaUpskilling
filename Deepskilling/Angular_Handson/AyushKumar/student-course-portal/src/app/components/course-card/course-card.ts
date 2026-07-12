import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {

  @Input()
  course: any;

  ngOnChanges(changes: SimpleChanges): void {

    console.log('Course input changed');

    console.log('Previous Value:',
      changes['course']?.previousValue);

    console.log('Current Value:',
      changes['course']?.currentValue);

  }

}