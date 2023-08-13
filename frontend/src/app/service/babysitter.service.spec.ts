import { TestBed } from '@angular/core/testing';

import { BabysitterService } from './babysitter.service';

describe('BabysitterService', () => {
  let service: BabysitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabysitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
