import { TestBed } from '@angular/core/testing';

import { VehicleLineMaintenanceService } from './vehicle-line-maintenance.service';

describe('VehicleLineMaintenanceService', () => {
  let service: VehicleLineMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleLineMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
