import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 3];
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    const index = this.enrolledCourseIds.indexOf(courseId);
    if (index !== -1) {
      this.enrolledCourseIds.splice(index, 1);
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    let loadedCourses: Course[] = [];
    this.courseService.getCourses().subscribe((courses) => {
      loadedCourses = courses.filter((c) => this.enrolledCourseIds.includes(c.id));
    });
    return loadedCourses;
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?courseId=${courseId}`);
  }

  // Step 87 Comment: switchMap cancels the previous inner Observable subscription whenever a new value arrives. This prevents race conditions and out-of-order responses by ensuring only the latest HTTP request completes.
  loadEnrolledStudentsForSelectedCourse(courseId$: Observable<number>): Observable<any[]> {
    return courseId$.pipe(
      switchMap((courseId) => this.getStudentsByCourse(courseId))
    );
  }
}
