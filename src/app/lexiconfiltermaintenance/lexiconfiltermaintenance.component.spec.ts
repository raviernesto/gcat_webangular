import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexiconfiltermaintenanceComponent } from './lexiconfiltermaintenance.component';

describe('LexiconfiltermaintenanceComponent', () => {
  let component: LexiconfiltermaintenanceComponent;
  let fixture: ComponentFixture<LexiconfiltermaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexiconfiltermaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiconfiltermaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
