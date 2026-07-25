import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesLayout } from './courses-layout';
import { provideRouter } from '@angular/router';

describe('CoursesLayout', () => {
  let component: CoursesLayout;
  let fixture: ComponentFixture<CoursesLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesLayout],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
