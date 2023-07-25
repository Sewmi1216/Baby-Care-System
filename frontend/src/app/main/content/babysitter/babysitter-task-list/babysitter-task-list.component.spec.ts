import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterTaskListComponent } from './babysitter-task-list.component';

describe('BabysitterTaskListComponent', () => {
  let component: BabysitterTaskListComponent;
  let fixture: ComponentFixture<BabysitterTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterTaskListComponent]
    });
    fixture = TestBed.createComponent(BabysitterTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
