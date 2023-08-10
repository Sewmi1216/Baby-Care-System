import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentdashLeftContentComponent } from './parentdash-left-content.component';

describe('ParentdashLeftContentComponent', () => {
  let component: ParentdashLeftContentComponent;
  let fixture: ComponentFixture<ParentdashLeftContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentdashLeftContentComponent]
    });
    fixture = TestBed.createComponent(ParentdashLeftContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
