import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyBabysittersComponent } from './verify-babysitters.component';

describe('VerifyBabysittersComponent', () => {
  let component: VerifyBabysittersComponent;
  let fixture: ComponentFixture<VerifyBabysittersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyBabysittersComponent]
    });
    fixture = TestBed.createComponent(VerifyBabysittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
