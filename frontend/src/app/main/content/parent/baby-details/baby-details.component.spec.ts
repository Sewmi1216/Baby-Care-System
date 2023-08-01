import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyDetailsComponent } from './baby-details.component';

describe('BabyDetailsComponent', () => {
  let component: BabyDetailsComponent;
  let fixture: ComponentFixture<BabyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabyDetailsComponent]
    });
    fixture = TestBed.createComponent(BabyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
