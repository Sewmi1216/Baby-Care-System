import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousTaskListsComponent } from './previous-task-lists.component';

describe('PreviousTaskListsComponent', () => {
  let component: PreviousTaskListsComponent;
  let fixture: ComponentFixture<PreviousTaskListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousTaskListsComponent]
    });
    fixture = TestBed.createComponent(PreviousTaskListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
