import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstDialogComponent } from './const-dialog.component';

describe('ConstDialogComponent', () => {
  let component: ConstDialogComponent;
  let fixture: ComponentFixture<ConstDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
