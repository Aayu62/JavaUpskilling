import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {
  totalCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCount();
  }

  loadCount(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.totalCourses = courses.length;
    });
  }

  addDemoCourse(): void {
    const idNum = Date.now();
    this.courseService.createCourse({
      name: `New Elective ${idNum % 100}`,
      code: `ELC${idNum % 1000}`,
      credits: 3,
      gradeStatus: 'pending'
    }).subscribe(() => {
      this.loadCount();
    });
  }
}
