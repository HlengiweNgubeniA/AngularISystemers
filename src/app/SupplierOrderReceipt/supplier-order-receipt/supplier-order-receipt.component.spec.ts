import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderReceiptComponent } from './supplier-order-receipt.component';

describe('SupplierOrderReceiptComponent', () => {
  let component: SupplierOrderReceiptComponent;
  let fixture: ComponentFixture<SupplierOrderReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierOrderReceiptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierOrderReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
