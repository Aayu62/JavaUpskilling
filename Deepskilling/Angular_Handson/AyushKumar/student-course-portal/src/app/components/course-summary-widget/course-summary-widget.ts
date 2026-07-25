import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget {
  constructor(private courseService: CourseService) {}

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  addDemoCourse(): void {
    const id = Date.now();
    this.courseService.addCourse({
      id: id,
      name: `New Elective ${id % 100}`,
      code: `ELC${id % 1000}`,
      credits: 3,
      gradeStatus: 'pending'
    });
  }
}
