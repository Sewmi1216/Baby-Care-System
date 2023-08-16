import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationDetailsComponent } from './vaccination-details.component';

describe('VaccinationDetailsComponent', () => {
  let component: VaccinationDetailsComponent;
  let fixture: ComponentFixture<VaccinationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationDetailsComponent]
    });
    fixture = TestBed.createComponent(VaccinationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
