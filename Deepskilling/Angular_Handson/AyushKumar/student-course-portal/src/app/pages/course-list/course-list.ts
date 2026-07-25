import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

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
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.courses = this.courseService.getCourses();
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }
}