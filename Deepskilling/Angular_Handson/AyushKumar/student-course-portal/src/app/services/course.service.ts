import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private fallbackCourses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Data Structures', code: 'CSE201', credits: 3, gradeStatus: 'failed' },
    { id: 3, name: 'Database Systems', code: 'DB301', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Operating Systems', code: 'OS401', credits: 3, gradeStatus: 'passed' },
    { id: 5, name: 'Computer Networks', code: 'CN501', credits: 4, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Step 85 Comment: tap is preferred over side effects inside map because tap is designed specifically for side effects (logging, analytics, state updates) without mutating the stream values, whereas map is intended solely for data transformation.
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap((courses) => console.log('Courses loaded:', courses.length)),
      map((courses) => courses.filter((c) => c.credits > 0)),
      catchError((err) => {
        console.error(err);
        return of(this.fallbackCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const found = this.fallbackCourses.find((c) => c.id === id);
        if (found) return of(found);
        return throwError(() => new Error('Course not found'));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(() => {
        const newCourse: Course = { ...course, id: Date.now() };
        this.fallbackCourses.push(newCourse);
        return of(newCourse);
      })
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(() => {
        const index = this.fallbackCourses.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.fallbackCourses[index] = { ...this.fallbackCourses[index], ...course };
          return of(this.fallbackCourses[index]);
        }
        return throwError(() => new Error('Course update failed'));
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        this.fallbackCourses = this.fallbackCourses.filter((c) => c.id !== id);
        return of(undefined as unknown as void);
      })
    );
  }
}
