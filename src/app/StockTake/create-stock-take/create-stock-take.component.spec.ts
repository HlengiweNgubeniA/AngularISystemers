import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockTakeComponent } from './create-stock-take.component';

describe('CreateStockTakeComponent', () => {
  let component: CreateStockTakeComponent;
  let fixture: ComponentFixture<CreateStockTakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockTakeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStockTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
