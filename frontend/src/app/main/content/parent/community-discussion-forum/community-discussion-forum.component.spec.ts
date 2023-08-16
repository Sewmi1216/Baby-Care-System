import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDiscussionForumComponent } from './community-discussion-forum.component';

describe('CommunityDiscussionForumComponent', () => {
  let component: CommunityDiscussionForumComponent;
  let fixture: ComponentFixture<CommunityDiscussionForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityDiscussionForumComponent]
    });
    fixture = TestBed.createComponent(CommunityDiscussionForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
