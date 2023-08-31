import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationListSetupComponent } from './calibration-list-setup.component';

describe('CalibrationListSetupComponent', () => {
  let component: CalibrationListSetupComponent;
  let fixture: ComponentFixture<CalibrationListSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationListSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationListSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
