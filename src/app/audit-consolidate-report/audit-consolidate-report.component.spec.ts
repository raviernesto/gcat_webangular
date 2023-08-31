import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditConsolidateReportComponent } from './audit-consolidate-report.component';

describe('AuditConsolidateReportComponent', () => {
  let component: AuditConsolidateReportComponent;
  let fixture: ComponentFixture<AuditConsolidateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditConsolidateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditConsolidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
