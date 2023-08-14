import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { domainExpertGuard } from './domain-expert.guard';

describe('domainExpertGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => domainExpertGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
