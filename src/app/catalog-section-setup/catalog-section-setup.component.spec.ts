import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSectionSetupComponent } from './catalog-section-setup.component';

describe('CatalogSectionSetupComponent', () => {
  let component: CatalogSectionSetupComponent;
  let fixture: ComponentFixture<CatalogSectionSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogSectionSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSectionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
