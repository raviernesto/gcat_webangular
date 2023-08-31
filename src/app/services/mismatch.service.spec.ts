import { TestBed } from '@angular/core/testing';

import { MismatchService } from './mismatch.service';

describe('MismatchService', () => {
  let service: MismatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MismatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
