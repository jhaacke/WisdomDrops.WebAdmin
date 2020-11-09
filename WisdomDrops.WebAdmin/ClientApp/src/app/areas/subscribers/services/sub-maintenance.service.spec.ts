import { TestBed, inject } from '@angular/core/testing';

import { SubMaintenanceService } from './sub-maintenance.service';

describe('SubMaintenanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubMaintenanceService]
    });
  });

  it('should be created', inject([SubMaintenanceService], (service: SubMaintenanceService) => {
    expect(service).toBeTruthy();
  }));
});
