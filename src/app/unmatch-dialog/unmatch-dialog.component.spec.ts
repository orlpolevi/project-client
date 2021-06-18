import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmatchDialogComponent } from './unmatch-dialog.component';

describe('UnmatchDialogComponent', () => {
  let component: UnmatchDialogComponent;
  let fixture: ComponentFixture<UnmatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnmatchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
