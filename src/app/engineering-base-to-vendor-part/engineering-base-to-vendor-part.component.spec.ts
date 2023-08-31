import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringBaseToVendorPartComponent } from './engineering-base-to-vendor-part.component';

describe('EngineeringBaseToVendorPartComponent', () => {
  let component: EngineeringBaseToVendorPartComponent;
  let fixture: ComponentFixture<EngineeringBaseToVendorPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineeringBaseToVendorPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineeringBaseToVendorPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
