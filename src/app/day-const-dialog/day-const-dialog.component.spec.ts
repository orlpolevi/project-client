import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayConstDialogComponent } from './day-const-dialog.component';

describe('DayConstDialogComponent', () => {
  let component: DayConstDialogComponent;
  let fixture: ComponentFixture<DayConstDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayConstDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayConstDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
