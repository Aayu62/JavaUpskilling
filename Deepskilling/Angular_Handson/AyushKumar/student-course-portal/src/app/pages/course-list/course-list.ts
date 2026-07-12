import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  courses = [

    {
      id: 1,
      name: 'Angular Fundamentals',
      code: 'ANG101'
    },

    {
      id: 2,
      name: 'Data Structures',
      code: 'CSE201'
    },

    {
      id: 3,
      name: 'Database Systems',
      code: 'DB301'
    }

  ];

}