import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedCommoditiesDetailsComponent } from './unassigned-commodities-details.component';

describe('UnassignedCommoditiesDetailsComponent', () => {
  let component: UnassignedCommoditiesDetailsComponent;
  let fixture: ComponentFixture<UnassignedCommoditiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedCommoditiesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedCommoditiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
