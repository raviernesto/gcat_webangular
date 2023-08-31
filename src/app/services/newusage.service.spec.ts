import { TestBed } from '@angular/core/testing';

import { NewusageService } from './newusage.service';

describe('NewusageService', () => {
  let service: NewusageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewusageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
