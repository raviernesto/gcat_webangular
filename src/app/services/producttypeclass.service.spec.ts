import { TestBed } from '@angular/core/testing';

import { ProducttypeclassService } from './producttypeclass.service';

describe('ProducttypeclassService', () => {
  let service: ProducttypeclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducttypeclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
