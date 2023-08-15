import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { babysitterGuard } from './babysitter.guard';

describe('babysitterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => babysitterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
