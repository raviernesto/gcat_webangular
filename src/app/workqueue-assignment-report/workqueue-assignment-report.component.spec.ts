import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkqueueAssignmentReportComponent } from './workqueue-assignment-report.component';

describe('WorkqueueAssignmentReportComponent', () => {
  let component: WorkqueueAssignmentReportComponent;
  let fixture: ComponentFixture<WorkqueueAssignmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkqueueAssignmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkqueueAssignmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
