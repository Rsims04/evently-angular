import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountComponent } from './createaccount.component';

describe('CreateaccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAccountComponent],
    });
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
