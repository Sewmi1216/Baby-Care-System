import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserAccountsMoreComponent } from './manage-user-accounts-more.component';

describe('ManageUserAccountsMoreComponent', () => {
  let component: ManageUserAccountsMoreComponent;
  let fixture: ComponentFixture<ManageUserAccountsMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserAccountsMoreComponent]
    });
    fixture = TestBed.createComponent(ManageUserAccountsMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
