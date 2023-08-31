import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditSectionViewComponent } from './audit-section-view.component';

describe('AuditSectionViewComponent', () => {
  let component: AuditSectionViewComponent;
  let fixture: ComponentFixture<AuditSectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditSectionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
