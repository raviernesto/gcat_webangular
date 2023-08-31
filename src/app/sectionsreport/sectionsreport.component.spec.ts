import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsreportComponent } from './sectionsreport.component';

describe('SectionsreportComponent', () => {
  let component: SectionsreportComponent;
  let fixture: ComponentFixture<SectionsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
