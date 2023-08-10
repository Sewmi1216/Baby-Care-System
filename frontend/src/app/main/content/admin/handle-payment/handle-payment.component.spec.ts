import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlePaymentComponent } from './handle-payment.component';

describe('HandlePaymentComponent', () => {
  let component: HandlePaymentComponent;
  let fixture: ComponentFixture<HandlePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandlePaymentComponent]
    });
    fixture = TestBed.createComponent(HandlePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
