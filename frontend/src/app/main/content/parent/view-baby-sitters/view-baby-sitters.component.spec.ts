import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBabySittersComponent } from './view-baby-sitters.component';

describe('ViewBabySittersComponent', () => {
  let component: ViewBabySittersComponent;
  let fixture: ComponentFixture<ViewBabySittersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBabySittersComponent]
    });
    fixture = TestBed.createComponent(ViewBabySittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
