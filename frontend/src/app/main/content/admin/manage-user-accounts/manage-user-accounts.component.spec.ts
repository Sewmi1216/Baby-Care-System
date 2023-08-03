import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserAccountsComponent } from './manage-user-accounts.component';

describe('ManageUserAccountsComponent', () => {
  let component: ManageUserAccountsComponent;
  let fixture: ComponentFixture<ManageUserAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserAccountsComponent]
    });
    fixture = TestBed.createComponent(ManageUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
