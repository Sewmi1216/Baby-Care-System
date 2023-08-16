import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBabysitterComponent } from './my-babysitter.component';

describe('MyBabysitterComponent', () => {
  let component: MyBabysitterComponent;
  let fixture: ComponentFixture<MyBabysitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBabysitterComponent]
    });
    fixture = TestBed.createComponent(MyBabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
