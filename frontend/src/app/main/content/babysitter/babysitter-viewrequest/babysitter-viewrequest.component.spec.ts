import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterViewrequestComponent } from './babysitter-viewrequest.component';

describe('BabysitterViewrequestComponent', () => {
  let component: BabysitterViewrequestComponent;
  let fixture: ComponentFixture<BabysitterViewrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterViewrequestComponent]
    });
    fixture = TestBed.createComponent(BabysitterViewrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
