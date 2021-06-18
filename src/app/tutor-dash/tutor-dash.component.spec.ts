import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashComponent } from './tutor-dash.component';

describe('TutorDashComponent', () => {
  let component: TutorDashComponent;
  let fixture: ComponentFixture<TutorDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
