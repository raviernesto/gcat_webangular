import { TestBed } from '@angular/core/testing';

import { WorkqueuereportService } from './workqueuereport.service';

describe('WorkqueuereportService', () => {
  let service: WorkqueuereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkqueuereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
