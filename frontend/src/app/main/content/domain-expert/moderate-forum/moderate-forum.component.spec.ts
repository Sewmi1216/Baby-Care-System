import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateForumComponent } from './moderate-forum.component';

describe('ModerateForumComponent', () => {
  let component: ModerateForumComponent;
  let fixture: ComponentFixture<ModerateForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerateForumComponent]
    });
    fixture = TestBed.createComponent(ModerateForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
