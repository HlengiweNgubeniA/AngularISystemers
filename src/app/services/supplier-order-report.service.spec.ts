import { TestBed } from '@angular/core/testing';

import { SupplierOrderReportService } from './supplier-order-report.service';

describe('SupplierOrderReportService', () => {
  let service: SupplierOrderReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierOrderReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
