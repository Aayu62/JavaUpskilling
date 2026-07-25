import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, NgFor, NgIf, AsyncPipe, FormsModule, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  selectedCourseId: number | null = null;
  searchTerm = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
    }
    this.store.dispatch(loadCourses());
  }

  onSearchChange(): void {
    this.router.navigate(['courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }

  get filteredCourses$(): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) => {
        if (!this.searchTerm.trim()) {
          return courses;
        }
        return courses.filter(
          (c) =>
            c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      })
    );
  }

  onCourseClick(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }
}