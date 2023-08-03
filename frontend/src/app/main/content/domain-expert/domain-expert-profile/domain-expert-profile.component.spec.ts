import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainExpertProfileComponent } from './domain-expert-profile.component';

describe('DomainExpertProfileComponent', () => {
  let component: DomainExpertProfileComponent;
  let fixture: ComponentFixture<DomainExpertProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainExpertProfileComponent]
    });
    fixture = TestBed.createComponent(DomainExpertProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
