import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListTemplatesComponent } from './task-list-templates.component';

describe('TaskListTemplatesComponent', () => {
  let component: TaskListTemplatesComponent;
  let fixture: ComponentFixture<TaskListTemplatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListTemplatesComponent]
    });
    fixture = TestBed.createComponent(TaskListTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
