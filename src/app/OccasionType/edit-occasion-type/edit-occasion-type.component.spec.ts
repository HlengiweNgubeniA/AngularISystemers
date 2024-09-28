import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOccasionTypeComponent } from './edit-occasion-type.component';

describe('EditOccasionTypeComponent', () => {
  let component: EditOccasionTypeComponent;
  let fixture: ComponentFixture<EditOccasionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOccasionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOccasionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
