import { TestBed } from '@angular/core/testing';

import { SupplierOrderReceiptService } from './supplier-order-receipt.service';

describe('SupplierOrderReceiptService', () => {
  let service: SupplierOrderReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierOrderReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
