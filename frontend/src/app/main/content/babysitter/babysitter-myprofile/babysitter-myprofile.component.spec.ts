import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterMyprofileComponent } from './babysitter-myprofile.component';

describe('BabysitterMyprofileComponent', () => {
  let component: BabysitterMyprofileComponent;
  let fixture: ComponentFixture<BabysitterMyprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterMyprofileComponent]
    });
    fixture = TestBed.createComponent(BabysitterMyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
