import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBabysittersComponent } from './search-babysitters.component';

describe('SearchBabysittersComponent', () => {
  let component: SearchBabysittersComponent;
  let fixture: ComponentFixture<SearchBabysittersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBabysittersComponent]
    });
    fixture = TestBed.createComponent(SearchBabysittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
