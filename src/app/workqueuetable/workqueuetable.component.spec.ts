import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkqueuetableComponent } from './workqueuetable.component';

describe('WorkqueuetableComponent', () => {
  let component: WorkqueuetableComponent;
  let fixture: ComponentFixture<WorkqueuetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkqueuetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkqueuetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
