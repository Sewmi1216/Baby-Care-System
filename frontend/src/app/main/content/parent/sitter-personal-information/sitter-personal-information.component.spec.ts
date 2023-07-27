import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterPersonalInformationComponent } from './sitter-personal-information.component';

describe('SitterPersonalInformationComponent', () => {
  let component: SitterPersonalInformationComponent;
  let fixture: ComponentFixture<SitterPersonalInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitterPersonalInformationComponent]
    });
    fixture = TestBed.createComponent(SitterPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
