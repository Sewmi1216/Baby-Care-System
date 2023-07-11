import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavParentComponent } from './nav-parent.component';

describe('NavParentComponent', () => {
  let component: NavParentComponent;
  let fixture: ComponentFixture<NavParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavParentComponent]
    });
    fixture = TestBed.createComponent(NavParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
