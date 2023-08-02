import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainExpertModerateCommunityComponent } from './domain-expert-moderate-community.component';

describe('DomainExpertModerateCommunityComponent', () => {
  let component: DomainExpertModerateCommunityComponent;
  let fixture: ComponentFixture<DomainExpertModerateCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainExpertModerateCommunityComponent]
    });
    fixture = TestBed.createComponent(DomainExpertModerateCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
