import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDasboardIncomeChartsComponent } from './admin-dasboard-income-charts.component';

describe('AdminDasboardIncomeChartsComponent', () => {
  let component: AdminDasboardIncomeChartsComponent;
  let fixture: ComponentFixture<AdminDasboardIncomeChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDasboardIncomeChartsComponent]
    });
    fixture = TestBed.createComponent(AdminDasboardIncomeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
