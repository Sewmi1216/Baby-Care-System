import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterSignupComponent } from './babysitter-signup.component';

describe('BabysitterSignupComponent', () => {
  let component: BabysitterSignupComponent;
  let fixture: ComponentFixture<BabysitterSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterSignupComponent]
    });
    fixture = TestBed.createComponent(BabysitterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
