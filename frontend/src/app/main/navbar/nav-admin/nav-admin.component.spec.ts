import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdminComponent } from './nav-admin.component';

describe('NavAdminComponent', () => {
  let component: NavAdminComponent;
  let fixture: ComponentFixture<NavAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavAdminComponent]
    });
    fixture = TestBed.createComponent(NavAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
