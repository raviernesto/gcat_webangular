import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditySetupComponent } from './commodity-setup.component';

describe('CommoditySetupComponent', () => {
  let component: CommoditySetupComponent;
  let fixture: ComponentFixture<CommoditySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoditySetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoditySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
