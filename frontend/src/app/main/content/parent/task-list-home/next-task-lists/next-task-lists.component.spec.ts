import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTaskListsComponent } from './next-task-lists.component';

describe('NextTaskListsComponent', () => {
  let component: NextTaskListsComponent;
  let fixture: ComponentFixture<NextTaskListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextTaskListsComponent]
    });
    fixture = TestBed.createComponent(NextTaskListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
