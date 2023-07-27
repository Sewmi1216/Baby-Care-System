import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainExpertDashboardComponent } from './domain-expert-dashboard.component';

describe('DomainExpertDashboardComponent', () => {
  let component: DomainExpertDashboardComponent;
  let fixture: ComponentFixture<DomainExpertDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainExpertDashboardComponent]
    });
    fixture = TestBed.createComponent(DomainExpertDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
