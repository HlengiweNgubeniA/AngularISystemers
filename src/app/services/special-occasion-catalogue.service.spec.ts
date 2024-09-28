import { TestBed } from '@angular/core/testing';

import { SpecialOccasionCatalogueService } from './special-occasion-catalogue.service';

describe('SpecialOccasionCatalogueService', () => {
  let service: SpecialOccasionCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialOccasionCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
