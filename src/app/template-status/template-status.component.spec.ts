import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateStatusComponent } from './template-status.component';

describe('TemplateStatusComponent', () => {
  let component: TemplateStatusComponent;
  let fixture: ComponentFixture<TemplateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
