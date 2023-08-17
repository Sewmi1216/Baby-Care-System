import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviosTaskListsComponent } from './previos-task-lists.component';

describe('PreviosTaskListsComponent', () => {
  let component: PreviosTaskListsComponent;
  let fixture: ComponentFixture<PreviosTaskListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviosTaskListsComponent]
    });
    fixture = TestBed.createComponent(PreviosTaskListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
