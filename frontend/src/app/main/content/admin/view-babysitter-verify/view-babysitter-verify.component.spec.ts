import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBabysitterVerifyComponent } from './view-babysitter-verify.component';

describe('ViewBabysitterVerifyComponent', () => {
  let component: ViewBabysitterVerifyComponent;
  let fixture: ComponentFixture<ViewBabysitterVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBabysitterVerifyComponent]
    });
    fixture = TestBed.createComponent(ViewBabysitterVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
