import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterTasklistComponent } from './babysitter-tasklist.component';

describe('BabysitterTasklistComponent', () => {
  let component: BabysitterTasklistComponent;
  let fixture: ComponentFixture<BabysitterTasklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterTasklistComponent]
    });
    fixture = TestBed.createComponent(BabysitterTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
