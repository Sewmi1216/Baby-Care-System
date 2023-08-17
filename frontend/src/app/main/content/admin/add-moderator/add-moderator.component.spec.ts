import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeratorComponent } from './add-moderator.component';

describe('AddModeratorComponent', () => {
  let component: AddModeratorComponent;
  let fixture: ComponentFixture<AddModeratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModeratorComponent]
    });
    fixture = TestBed.createComponent(AddModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
