import { TestBed } from '@angular/core/testing';

import { WorkqueueAssignmentReportService } from './workqueue-assignment-report.service';

describe('WorkqueueAssignmentReportService', () => {
  let service: WorkqueueAssignmentReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkqueueAssignmentReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
