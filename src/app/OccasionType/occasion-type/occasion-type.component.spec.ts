import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionTypeComponent } from './occasion-type.component';

describe('OccasionTypeComponent', () => {
  let component: OccasionTypeComponent;
  let fixture: ComponentFixture<OccasionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccasionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccasionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
