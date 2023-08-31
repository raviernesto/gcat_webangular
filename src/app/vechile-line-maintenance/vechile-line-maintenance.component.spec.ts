import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileLineMaintenanceComponent } from './vechile-line-maintenance.component';

describe('VechileLineMaintenanceComponent', () => {
  let component: VechileLineMaintenanceComponent;
  let fixture: ComponentFixture<VechileLineMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VechileLineMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VechileLineMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
