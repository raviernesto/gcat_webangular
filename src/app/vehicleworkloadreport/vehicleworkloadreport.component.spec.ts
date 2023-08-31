import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleworkloadreportComponent } from './vehicleworkloadreport.component';

describe('VehicleworkloadreportComponent', () => {
  let component: VehicleworkloadreportComponent;
  let fixture: ComponentFixture<VehicleworkloadreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleworkloadreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleworkloadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
