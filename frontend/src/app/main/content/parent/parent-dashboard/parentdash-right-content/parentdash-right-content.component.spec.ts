import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentdashRightContentComponent } from './parentdash-right-content.component';

describe('ParentdashRightContentComponent', () => {
  let component: ParentdashRightContentComponent;
  let fixture: ComponentFixture<ParentdashRightContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentdashRightContentComponent]
    });
    fixture = TestBed.createComponent(ParentdashRightContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
