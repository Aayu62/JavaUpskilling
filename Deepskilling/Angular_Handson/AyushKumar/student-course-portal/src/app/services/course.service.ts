import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
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

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
