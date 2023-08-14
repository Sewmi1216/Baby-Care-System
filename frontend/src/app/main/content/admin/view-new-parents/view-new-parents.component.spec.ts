import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewParentsComponent } from './view-new-parents.component';

describe('ViewNewParentsComponent', () => {
  let component: ViewNewParentsComponent;
  let fixture: ComponentFixture<ViewNewParentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNewParentsComponent]
    });
    fixture = TestBed.createComponent(ViewNewParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
