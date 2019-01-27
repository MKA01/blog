import { TestBed } from '@angular/core/testing';

import { SupervisorGuardService } from './supervisor-guard.service';

describe('SupervisorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupervisorGuardService = TestBed.get(SupervisorGuardService);
    expect(service).toBeTruthy();
  });
});
