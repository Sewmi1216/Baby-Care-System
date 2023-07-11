import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDomainExpertComponent } from './nav-domain-expert.component';

describe('NavDomainExpertComponent', () => {
  let component: NavDomainExpertComponent;
  let fixture: ComponentFixture<NavDomainExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavDomainExpertComponent]
    });
    fixture = TestBed.createComponent(NavDomainExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
