import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentCommoditySetupComponent } from './development-commodity-setup.component';

describe('DevelopmentCommoditySetupComponent', () => {
  let component: DevelopmentCommoditySetupComponent;
  let fixture: ComponentFixture<DevelopmentCommoditySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentCommoditySetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentCommoditySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
