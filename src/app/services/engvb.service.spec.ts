import { TestBed } from '@angular/core/testing';

import { EngvbService } from './engvb.service';

describe('EngvbService', () => {
  let service: EngvbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngvbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
