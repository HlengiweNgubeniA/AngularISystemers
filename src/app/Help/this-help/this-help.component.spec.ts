import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisHelpComponent } from './this-help.component';

describe('ThisHelpComponent', () => {
  let component: ThisHelpComponent;
  let fixture: ComponentFixture<ThisHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThisHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThisHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
