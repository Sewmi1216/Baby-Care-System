import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterBlogComponent } from './babysitter-blog.component';

describe('BabysitterBlogComponent', () => {
  let component: BabysitterBlogComponent;
  let fixture: ComponentFixture<BabysitterBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterBlogComponent]
    });
    fixture = TestBed.createComponent(BabysitterBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
