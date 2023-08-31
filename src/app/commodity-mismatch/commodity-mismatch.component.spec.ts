import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityMismatchComponent } from './commodity-mismatch.component';

describe('CommodityMismatchComponent', () => {
  let component: CommodityMismatchComponent;
  let fixture: ComponentFixture<CommodityMismatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityMismatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityMismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
