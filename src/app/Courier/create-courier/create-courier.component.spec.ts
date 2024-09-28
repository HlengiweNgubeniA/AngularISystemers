import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourierComponent } from './create-courier.component';

describe('CreateCourierComponent', () => {
  let component: CreateCourierComponent;
  let fixture: ComponentFixture<CreateCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCourierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
