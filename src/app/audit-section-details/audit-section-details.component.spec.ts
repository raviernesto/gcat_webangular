import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditSectionDetailsComponent } from './audit-section-details.component';

describe('AuditSectionDetailsComponent', () => {
  let component: AuditSectionDetailsComponent;
  let fixture: ComponentFixture<AuditSectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditSectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
