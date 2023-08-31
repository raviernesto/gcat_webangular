import { TestBed } from '@angular/core/testing';

import { IllworkService } from './illwork.service';

describe('IllworkService', () => {
  let service: IllworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IllworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
