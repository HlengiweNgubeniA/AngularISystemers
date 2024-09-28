import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPackageComponent } from './product-package.component';

describe('ProductPackageComponent', () => {
  let component: ProductPackageComponent;
  let fixture: ComponentFixture<ProductPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
