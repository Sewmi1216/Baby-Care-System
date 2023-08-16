import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBabysitterListComponent } from './pending-babysitter-list.component';

describe('PendingBabysitterListComponent', () => {
  let component: PendingBabysitterListComponent;
  let fixture: ComponentFixture<PendingBabysitterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingBabysitterListComponent]
    });
    fixture = TestBed.createComponent(PendingBabysitterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
