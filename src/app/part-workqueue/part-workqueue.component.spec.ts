import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartWorkqueueComponent } from './part-workqueue.component';

describe('PartWorkqueueComponent', () => {
  let component: PartWorkqueueComponent;
  let fixture: ComponentFixture<PartWorkqueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartWorkqueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartWorkqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
