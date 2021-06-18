import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorListDialogComponent } from './tutor-list-dialog.component';

describe('TutorListDialogComponent', () => {
  let component: TutorListDialogComponent;
  let fixture: ComponentFixture<TutorListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
