import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, NgFor, NgIf, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = true;
  selectedCourseId: number | null = null;

  courses = [
    {
      id: 1,
      name: 'Angular Fundamentals',
      code: 'ANG101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Data Structures',
      code: 'CSE201',
      credits: 3,
      gradeStatus: 'failed'
    },
    {
      id: 3,
      name: 'Database Systems',
      code: 'DB301',
      credits: 4,
      gradeStatus: 'pending'
    },
    {
      id: 4,
      name: 'Operating Systems',
      code: 'OS401',
      credits: 3,
      gradeStatus: 'passed'
    },
    {
      id: 5,
      name: 'Computer Networks',
      code: 'CN501',
      credits: 4,
      gradeStatus: 'pending'
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

}