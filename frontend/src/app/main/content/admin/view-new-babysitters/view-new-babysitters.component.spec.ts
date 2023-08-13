import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewBabysittersComponent } from './view-new-babysitters.component';

describe('ViewNewBabysittersComponent', () => {
  let component: ViewNewBabysittersComponent;
  let fixture: ComponentFixture<ViewNewBabysittersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNewBabysittersComponent]
    });
    fixture = TestBed.createComponent(ViewNewBabysittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
