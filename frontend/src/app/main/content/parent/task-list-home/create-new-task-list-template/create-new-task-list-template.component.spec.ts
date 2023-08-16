import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTaskListTemplateComponent } from './create-new-task-list-template.component';

describe('CreateNewTaskListTemplateComponent', () => {
  let component: CreateNewTaskListTemplateComponent;
  let fixture: ComponentFixture<CreateNewTaskListTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewTaskListTemplateComponent]
    });
    fixture = TestBed.createComponent(CreateNewTaskListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
