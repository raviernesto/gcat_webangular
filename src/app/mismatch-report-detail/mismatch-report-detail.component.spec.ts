import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MismatchReportDetailComponent } from './mismatch-report-detail.component';

describe('MismatchReportDetailComponent', () => {
  let component: MismatchReportDetailComponent;
  let fixture: ComponentFixture<MismatchReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MismatchReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MismatchReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
