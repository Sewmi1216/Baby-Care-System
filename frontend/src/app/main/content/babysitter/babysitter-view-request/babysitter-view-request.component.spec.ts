import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterViewRequestComponent } from './babysitter-view-request.component';

describe('BabysitterViewRequestComponent', () => {
  let component: BabysitterViewRequestComponent;
  let fixture: ComponentFixture<BabysitterViewRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterViewRequestComponent]
    });
    fixture = TestBed.createComponent(BabysitterViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
