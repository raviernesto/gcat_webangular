import { TestBed } from '@angular/core/testing';

import { PartInfoService } from './part-info.service';

describe('PartInfoService', () => {
  let service: PartInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
