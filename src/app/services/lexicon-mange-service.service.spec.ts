import { TestBed } from '@angular/core/testing';

import { LexiconMangeServiceService } from './lexicon-mange-service.service';

describe('LexiconMangeServiceService', () => {
  let service: LexiconMangeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LexiconMangeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
