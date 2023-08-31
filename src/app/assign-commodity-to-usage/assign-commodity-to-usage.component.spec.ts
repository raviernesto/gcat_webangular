import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCommodityToUsageComponent } from './assign-commodity-to-usage.component';

describe('AssignCommodityToUsageComponent', () => {
  let component: AssignCommodityToUsageComponent;
  let fixture: ComponentFixture<AssignCommodityToUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCommodityToUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCommodityToUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
