import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPrefixManagementComponent } from './section-prefix-management.component';

describe('SectionPrefixManagementComponent', () => {
  let component: SectionPrefixManagementComponent;
  let fixture: ComponentFixture<SectionPrefixManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionPrefixManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPrefixManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
