import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudtiTrailReportComponent } from './audti-trail-report.component';

describe('AudtiTrailReportComponent', () => {
  let component: AudtiTrailReportComponent;
  let fixture: ComponentFixture<AudtiTrailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudtiTrailReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudtiTrailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
