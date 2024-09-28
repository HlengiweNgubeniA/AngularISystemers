import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductPackageComponent } from './create-product-package.component';

describe('CreateProductPackageComponent', () => {
  let component: CreateProductPackageComponent;
  let fixture: ComponentFixture<CreateProductPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
