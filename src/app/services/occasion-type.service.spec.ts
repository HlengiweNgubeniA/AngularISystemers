import { TestBed } from '@angular/core/testing';

import { OccasionTypeService } from './occasion-type.service';

describe('OccasionTypeService', () => {
  let service: OccasionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccasionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
