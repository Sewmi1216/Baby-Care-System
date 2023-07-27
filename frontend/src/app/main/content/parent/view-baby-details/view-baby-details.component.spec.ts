import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBabyDetailsComponent } from './view-baby-details.component';

describe('ViewBabyDetailsComponent', () => {
  let component: ViewBabyDetailsComponent;
  let fixture: ComponentFixture<ViewBabyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBabyDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewBabyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
