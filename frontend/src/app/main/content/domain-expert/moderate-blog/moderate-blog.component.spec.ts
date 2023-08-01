import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateBlogComponent } from './moderate-blog.component';

describe('ModerateBlogComponent', () => {
  let component: ModerateBlogComponent;
  let fixture: ComponentFixture<ModerateBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerateBlogComponent]
    });
    fixture = TestBed.createComponent(ModerateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
