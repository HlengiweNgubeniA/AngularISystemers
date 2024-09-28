import { TestBed } from '@angular/core/testing';

import { FlgServiceService } from './flg-service.service';

describe('FlgServiceService', () => {
  let service: FlgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
