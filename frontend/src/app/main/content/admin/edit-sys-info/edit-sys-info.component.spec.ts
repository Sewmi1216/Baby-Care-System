import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSysInfoComponent } from './edit-sys-info.component';

describe('EditSysInfoComponent', () => {
  let component: EditSysInfoComponent;
  let fixture: ComponentFixture<EditSysInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSysInfoComponent]
    });
    fixture = TestBed.createComponent(EditSysInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
