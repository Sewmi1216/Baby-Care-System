import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleComplaintsComponent } from './handle-complaints.component';

describe('HandleComplaintsComponent', () => {
  let component: HandleComplaintsComponent;
  let fixture: ComponentFixture<HandleComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandleComplaintsComponent]
    });
    fixture = TestBed.createComponent(HandleComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
