import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard,NgFor,NgIf],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  courses = [
  
    {
      id:1,
      name:'Angular Fundamentals',
      code:'ANG101',
      credits:4
    },
  
    {
      id:2,
      name:'Data Structures',
      code:'CSE201',
      credits:3
    },
  
    {
      id:3,
      name:'Database Systems',
      code:'DB301',
      credits:4
    },
  
    {
      id:4,
      name:'Operating Systems',
      code:'OS401',
      credits:3
    },
  
    {
      id:5,
      name:'Computer Networks',
      code:'CN501',
      credits:4
    }
  
  ];
  
  selectedCourseId:number|null=null;
  
  onEnroll(courseId:number){
  
     console.log("Enrolling in course:",courseId);
  
     this.selectedCourseId=courseId;
     
  }

}