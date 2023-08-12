import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { parentGuardGuard } from './parent-guard.guard';

describe('parentGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => parentGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
