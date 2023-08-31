import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedCommoditiesComponent } from './unassigned-commodities.component';

describe('UnassignedCommoditiesComponent', () => {
  let component: UnassignedCommoditiesComponent;
  let fixture: ComponentFixture<UnassignedCommoditiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedCommoditiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedCommoditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
