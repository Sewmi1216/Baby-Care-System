import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListHomeComponent } from './task-list-home.component';

describe('TaskListHomeComponent', () => {
  let component: TaskListHomeComponent;
  let fixture: ComponentFixture<TaskListHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListHomeComponent]
    });
    fixture = TestBed.createComponent(TaskListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
