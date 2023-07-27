import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterParentrequestComponent } from './babysitter-parentrequest.component';

describe('BabysitterParentrequestComponent', () => {
  let component: BabysitterParentrequestComponent;
  let fixture: ComponentFixture<BabysitterParentrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterParentrequestComponent]
    });
    fixture = TestBed.createComponent(BabysitterParentrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
