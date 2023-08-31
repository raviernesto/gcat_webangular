import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSectionAnalystcodeComponent } from './open-section-analystcode.component';

describe('OpenSectionAnalystcodeComponent', () => {
  let component: OpenSectionAnalystcodeComponent;
  let fixture: ComponentFixture<OpenSectionAnalystcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSectionAnalystcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSectionAnalystcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
