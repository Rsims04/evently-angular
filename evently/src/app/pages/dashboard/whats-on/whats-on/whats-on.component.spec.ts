import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsOnComponent } from './whats-on.component';

describe('WhatsOnComponent', () => {
  let component: WhatsOnComponent;
  let fixture: ComponentFixture<WhatsOnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsOnComponent],
    });
    fixture = TestBed.createComponent(WhatsOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
