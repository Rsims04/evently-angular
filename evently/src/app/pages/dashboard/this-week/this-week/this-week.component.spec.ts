import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekComponent } from './this-week.component';

describe('ThisWeekComponent', () => {
  let component: ThisWeekComponent;
  let fixture: ComponentFixture<ThisWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThisWeekComponent]
    });
    fixture = TestBed.createComponent(ThisWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
