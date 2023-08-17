import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBabysittersMoreComponent } from './requested-babysitters-more.component';

describe('RequestedBabysittersMoreComponent', () => {
  let component: RequestedBabysittersMoreComponent;
  let fixture: ComponentFixture<RequestedBabysittersMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedBabysittersMoreComponent]
    });
    fixture = TestBed.createComponent(RequestedBabysittersMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
