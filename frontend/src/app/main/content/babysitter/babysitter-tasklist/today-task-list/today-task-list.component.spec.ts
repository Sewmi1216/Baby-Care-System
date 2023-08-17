import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTaskListComponent } from './today-task-list.component';

describe('TodayTaskListComponent', () => {
  let component: TodayTaskListComponent;
  let fixture: ComponentFixture<TodayTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayTaskListComponent]
    });
    fixture = TestBed.createComponent(TodayTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
