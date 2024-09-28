import { TestBed } from '@angular/core/testing';

import { StockTypeService } from './stock-type.service';

describe('StockTypeService', () => {
  let service: StockTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
