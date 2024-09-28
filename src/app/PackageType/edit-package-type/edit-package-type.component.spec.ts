import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageTypeComponent } from './edit-package-type.component';

describe('EditPackageTypeComponent', () => {
  let component: EditPackageTypeComponent;
  let fixture: ComponentFixture<EditPackageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPackageTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPackageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
