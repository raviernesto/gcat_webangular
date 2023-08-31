import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleappComponent } from './sampleapp.component';

describe('SampleappComponent', () => {
  let component: SampleappComponent;
  let fixture: ComponentFixture<SampleappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
