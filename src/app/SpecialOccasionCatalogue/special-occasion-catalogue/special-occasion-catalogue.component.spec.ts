import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOccasionCatalogueComponent } from './special-occasion-catalogue.component';

describe('SpecialOccasionCatalogueComponent', () => {
  let component: SpecialOccasionCatalogueComponent;
  let fixture: ComponentFixture<SpecialOccasionCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialOccasionCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialOccasionCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
