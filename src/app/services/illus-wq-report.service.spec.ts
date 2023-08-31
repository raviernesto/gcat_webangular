import { TestBed } from '@angular/core/testing';

import { IllusWqReportService } from './illus-wq-report.service';

describe('IllusWqReportService', () => {
  let service: IllusWqReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IllusWqReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
