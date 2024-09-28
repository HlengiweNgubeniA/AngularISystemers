import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductPackageComponent } from './edit-product-package.component';

describe('EditProductPackageComponent', () => {
  let component: EditProductPackageComponent;
  let fixture: ComponentFixture<EditProductPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
