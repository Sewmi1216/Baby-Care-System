import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMyPlanComponent } from './parent-my-plan.component';

describe('ParentMyPlanComponent', () => {
  let component: ParentMyPlanComponent;
  let fixture: ComponentFixture<ParentMyPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentMyPlanComponent]
    });
    fixture = TestBed.createComponent(ParentMyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
