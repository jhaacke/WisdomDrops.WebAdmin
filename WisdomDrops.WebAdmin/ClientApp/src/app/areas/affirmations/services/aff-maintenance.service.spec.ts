import { TestBed, inject } from '@angular/core/testing';

import { AffMaintenanceService } from './aff-maintenance.service';

describe('AffMaintenanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AffMaintenanceService]
    });
  });

  it('should be created', inject([AffMaintenanceService], (service: AffMaintenanceService) => {
    expect(service).toBeTruthy();
  }));
});
