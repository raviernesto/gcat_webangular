import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityBaseDetailsComponent } from './commodity-base-details.component';

describe('CommodityBaseDetailsComponent', () => {
  let component: CommodityBaseDetailsComponent;
  let fixture: ComponentFixture<CommodityBaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityBaseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityBaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
