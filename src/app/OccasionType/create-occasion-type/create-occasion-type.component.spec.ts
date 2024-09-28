import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOccasionTypeComponent } from './create-occasion-type.component';

describe('CreateOccasionTypeComponent', () => {
  let component: CreateOccasionTypeComponent;
  let fixture: ComponentFixture<CreateOccasionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOccasionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOccasionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
