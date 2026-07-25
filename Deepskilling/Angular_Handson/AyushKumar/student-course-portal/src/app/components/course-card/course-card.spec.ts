import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCard } from './course-card';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { Course } from '../../models/course.model';
import { vi } from 'vitest';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course name in h3 template tag', () => {
    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();

    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested event when enroll button is clicked', () => {
    const spy = vi.spyOn(component.enrollRequested, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('.btn-enroll')).nativeElement;
    buttonElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should execute ngOnChanges and log changes', () => {
    const spy = vi.spyOn(console, 'log');
    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });

    expect(spy).toHaveBeenCalledWith('Course input changed');
  });
});
