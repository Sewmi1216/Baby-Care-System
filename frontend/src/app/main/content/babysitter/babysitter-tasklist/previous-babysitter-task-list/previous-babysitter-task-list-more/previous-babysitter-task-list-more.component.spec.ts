import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousBabysitterTaskListMoreComponent } from './previous-babysitter-task-list-more.component';

describe('PreviousBabysitterTaskListMoreComponent', () => {
  let component: PreviousBabysitterTaskListMoreComponent;
  let fixture: ComponentFixture<PreviousBabysitterTaskListMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousBabysitterTaskListMoreComponent]
    });
    fixture = TestBed.createComponent(PreviousBabysitterTaskListMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
