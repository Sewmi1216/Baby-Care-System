import { ComponentFixture, TestBed } from '@angular/core/testing';


import { GrowthParametersComponent } from './growth-parameters.component';

describe('GrowthParametersComponent', () => {
  let component: GrowthParametersComponent;
  let fixture: ComponentFixture<GrowthParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrowthParametersComponent]
    });
    fixture = TestBed.createComponent(GrowthParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
