import { TestBed } from '@angular/core/testing';

import { SendCatalogService } from './send-catalog.service';

describe('SendCatalogService', () => {
  let service: SendCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
