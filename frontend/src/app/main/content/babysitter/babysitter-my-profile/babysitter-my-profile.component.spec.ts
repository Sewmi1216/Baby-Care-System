import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterMyProfileComponent } from './babysitter-my-profile.component';

describe('BabysitterMyProfileComponent', () => {
  let component: BabysitterMyProfileComponent;
  let fixture: ComponentFixture<BabysitterMyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterMyProfileComponent]
    });
    fixture = TestBed.createComponent(BabysitterMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
