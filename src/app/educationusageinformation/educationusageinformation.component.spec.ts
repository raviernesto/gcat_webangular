import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationusageinformationComponent } from './educationusageinformation.component';

describe('EducationusageinformationComponent', () => {
  let component: EducationusageinformationComponent;
  let fixture: ComponentFixture<EducationusageinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationusageinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationusageinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
