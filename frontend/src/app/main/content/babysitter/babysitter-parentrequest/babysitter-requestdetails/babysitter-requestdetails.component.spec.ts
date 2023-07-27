import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterRequestdetailsComponent } from './babysitter-requestdetails.component';

describe('BabysitterRequestdetailsComponent', () => {
  let component: BabysitterRequestdetailsComponent;
  let fixture: ComponentFixture<BabysitterRequestdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterRequestdetailsComponent]
    });
    fixture = TestBed.createComponent(BabysitterRequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
