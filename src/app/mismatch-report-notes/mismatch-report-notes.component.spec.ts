import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MismatchReportNotesComponent } from './mismatch-report-notes.component';

describe('MismatchReportNotesComponent', () => {
  let component: MismatchReportNotesComponent;
  let fixture: ComponentFixture<MismatchReportNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MismatchReportNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MismatchReportNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
