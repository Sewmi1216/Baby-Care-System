import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterComponent } from './babysitter.component';

describe('BabysitterComponent', () => {
  let component: BabysitterComponent;
  let fixture: ComponentFixture<BabysitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterComponent]
    });
    fixture = TestBed.createComponent(BabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
