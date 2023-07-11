import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBabysitterComponent } from './nav-babysitter.component';

describe('NavBabysitterComponent', () => {
  let component: NavBabysitterComponent;
  let fixture: ComponentFixture<NavBabysitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBabysitterComponent]
    });
    fixture = TestBed.createComponent(NavBabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
