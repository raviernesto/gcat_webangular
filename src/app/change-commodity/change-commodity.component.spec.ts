import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCommodityComponent } from './change-commodity.component';

describe('ChangeCommodityComponent', () => {
  let component: ChangeCommodityComponent;
  let fixture: ComponentFixture<ChangeCommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCommodityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
