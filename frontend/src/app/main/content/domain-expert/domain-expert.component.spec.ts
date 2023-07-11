import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainExpertComponent } from './domain-expert.component';

describe('DomainExpertComponent', () => {
  let component: DomainExpertComponent;
  let fixture: ComponentFixture<DomainExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainExpertComponent]
    });
    fixture = TestBed.createComponent(DomainExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
