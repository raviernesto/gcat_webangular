import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestANewCommodityPropertyComponent } from './request-anew-commodity-property.component';

describe('RequestANewCommodityPropertyComponent', () => {
  let component: RequestANewCommodityPropertyComponent;
  let fixture: ComponentFixture<RequestANewCommodityPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestANewCommodityPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestANewCommodityPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
