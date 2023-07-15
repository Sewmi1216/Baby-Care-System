import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterDashboardComponent } from './babysitter-dashboard.component';

describe('BabysitterDashboardComponent', () => {
  let component: BabysitterDashboardComponent;
  let fixture: ComponentFixture<BabysitterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterDashboardComponent]
    });
    fixture = TestBed.createComponent(BabysitterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
