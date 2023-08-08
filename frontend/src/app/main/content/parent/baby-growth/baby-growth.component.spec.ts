import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyGrowthComponent } from './baby-growth.component';

describe('BabyGrowthComponent', () => {
  let component: BabyGrowthComponent;
  let fixture: ComponentFixture<BabyGrowthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabyGrowthComponent]
    });
    fixture = TestBed.createComponent(BabyGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
