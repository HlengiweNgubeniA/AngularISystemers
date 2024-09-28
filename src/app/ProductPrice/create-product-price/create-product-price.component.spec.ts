import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductPriceComponent } from './create-product-price.component';

describe('CreateProductPriceComponent', () => {
  let component: CreateProductPriceComponent;
  let fixture: ComponentFixture<CreateProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
