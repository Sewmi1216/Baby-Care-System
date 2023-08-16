import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterViewMoreParentRequestsComponent } from './babysitter-view-more-parent-requests.component';

describe('BabysitterViewMoreParentRequestsComponent', () => {
  let component: BabysitterViewMoreParentRequestsComponent;
  let fixture: ComponentFixture<BabysitterViewMoreParentRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterViewMoreParentRequestsComponent]
    });
    fixture = TestBed.createComponent(BabysitterViewMoreParentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
