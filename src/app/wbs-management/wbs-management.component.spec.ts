import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WbsManagementComponent } from './wbs-management.component';

describe('WbsManagementComponent', () => {
  let component: WbsManagementComponent;
  let fixture: ComponentFixture<WbsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WbsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WbsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
