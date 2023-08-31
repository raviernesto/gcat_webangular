import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTimeChangeComponent } from './job-time-change.component';

describe('JobTimeChangeComponent', () => {
  let component: JobTimeChangeComponent;
  let fixture: ComponentFixture<JobTimeChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTimeChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTimeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
