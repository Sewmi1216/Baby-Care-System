import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousTaskListComponent } from './previous-task-list.component';

describe('PreviousTaskListComponent', () => {
  let component: PreviousTaskListComponent;
  let fixture: ComponentFixture<PreviousTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousTaskListComponent]
    });
    fixture = TestBed.createComponent(PreviousTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
