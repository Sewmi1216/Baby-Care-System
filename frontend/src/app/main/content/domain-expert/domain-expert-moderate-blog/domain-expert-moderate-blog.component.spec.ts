import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainExpertModerateBlogComponent } from './domain-expert-moderate-blog.component';

describe('DomainExpertModerateBlogComponent', () => {
  let component: DomainExpertModerateBlogComponent;
  let fixture: ComponentFixture<DomainExpertModerateBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainExpertModerateBlogComponent]
    });
    fixture = TestBed.createComponent(DomainExpertModerateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
