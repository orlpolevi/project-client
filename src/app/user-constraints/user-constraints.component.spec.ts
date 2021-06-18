import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConstraintsComponent } from './user-constraints.component';

describe('UserConstraintsComponent', () => {
  let component: UserConstraintsComponent;
  let fixture: ComponentFixture<UserConstraintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConstraintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
