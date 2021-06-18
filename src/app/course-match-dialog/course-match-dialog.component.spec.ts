import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMatchDialogComponent } from './course-match-dialog.component';

describe('CourseMatchDialogComponent', () => {
  let component: CourseMatchDialogComponent;
  let fixture: ComponentFixture<CourseMatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMatchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
