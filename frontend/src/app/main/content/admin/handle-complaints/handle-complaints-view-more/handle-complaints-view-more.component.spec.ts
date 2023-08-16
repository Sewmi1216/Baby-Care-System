import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleComplaintsViewMoreComponent } from './handle-complaints-view-more.component';

describe('HandleComplaintsViewMoreComponent', () => {
  let component: HandleComplaintsViewMoreComponent;
  let fixture: ComponentFixture<HandleComplaintsViewMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandleComplaintsViewMoreComponent]
    });
    fixture = TestBed.createComponent(HandleComplaintsViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
