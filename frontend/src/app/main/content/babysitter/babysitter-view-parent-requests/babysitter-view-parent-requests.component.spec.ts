import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterViewParentRequestsComponent } from './babysitter-view-parent-requests.component';

describe('BabysitterViewParentRequestsComponent', () => {
  let component: BabysitterViewParentRequestsComponent;
  let fixture: ComponentFixture<BabysitterViewParentRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterViewParentRequestsComponent]
    });
    fixture = TestBed.createComponent(BabysitterViewParentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
