import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockTypeComponent } from './create-stock-type.component';

describe('CreateStockTypeComponent', () => {
  let component: CreateStockTypeComponent;
  let fixture: ComponentFixture<CreateStockTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStockTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
