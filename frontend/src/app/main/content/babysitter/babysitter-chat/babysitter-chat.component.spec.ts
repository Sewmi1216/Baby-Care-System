import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterChatComponent } from './babysitter-chat.component';

describe('BabysitterChatComponent', () => {
  let component: BabysitterChatComponent;
  let fixture: ComponentFixture<BabysitterChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterChatComponent]
    });
    fixture = TestBed.createComponent(BabysitterChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
