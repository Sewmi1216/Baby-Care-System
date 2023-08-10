import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardUserChartsComponent } from './admin-dashboard-user-charts.component';

describe('AdminDashboardUserChartsComponent', () => {
  let component: AdminDashboardUserChartsComponent;
  let fixture: ComponentFixture<AdminDashboardUserChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardUserChartsComponent]
    });
    fixture = TestBed.createComponent(AdminDashboardUserChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
