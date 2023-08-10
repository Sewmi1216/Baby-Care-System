import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentdashTopContentComponent } from './parentdash-top-content.component';

describe('ParentdashTopContentComponent', () => {
  let component: ParentdashTopContentComponent;
  let fixture: ComponentFixture<ParentdashTopContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentdashTopContentComponent]
    });
    fixture = TestBed.createComponent(ParentdashTopContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
