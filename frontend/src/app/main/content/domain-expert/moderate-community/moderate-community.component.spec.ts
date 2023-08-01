import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateCommunityComponent } from './moderate-community.component';

describe('ModerateCommunityComponent', () => {
  let component: ModerateCommunityComponent;
  let fixture: ComponentFixture<ModerateCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerateCommunityComponent]
    });
    fixture = TestBed.createComponent(ModerateCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
