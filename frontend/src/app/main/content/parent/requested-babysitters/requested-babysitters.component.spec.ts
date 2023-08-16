import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBabysittersComponent } from './requested-babysitters.component';

describe('RequestedBabysittersComponent', () => {
  let component: RequestedBabysittersComponent;
  let fixture: ComponentFixture<RequestedBabysittersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedBabysittersComponent]
    });
    fixture = TestBed.createComponent(RequestedBabysittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
