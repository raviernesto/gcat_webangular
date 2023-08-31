import { TestBed } from '@angular/core/testing';

import { ClosedateserviceService } from './closedateservice.service';

describe('ClosedateserviceService', () => {
  let service: ClosedateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosedateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
