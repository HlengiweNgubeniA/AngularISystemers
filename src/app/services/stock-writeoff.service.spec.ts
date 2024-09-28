import { TestBed } from '@angular/core/testing';

import { StockWriteoffService } from './stock-writeoff.service';

describe('StockWriteoffService', () => {
  let service: StockWriteoffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockWriteoffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
