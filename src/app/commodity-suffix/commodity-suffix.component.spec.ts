import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditySuffixComponent } from './commodity-suffix.component';

describe('CommoditySuffixComponent', () => {
  let component: CommoditySuffixComponent;
  let fixture: ComponentFixture<CommoditySuffixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoditySuffixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoditySuffixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
