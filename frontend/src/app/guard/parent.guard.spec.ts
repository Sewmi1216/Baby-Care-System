import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { parentGuard } from './parent.guard';

describe('parentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => parentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
