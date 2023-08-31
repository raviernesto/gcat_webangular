import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageFeatureChangesComponent } from './usage-feature-changes.component';

describe('UsageFeatureChangesComponent', () => {
  let component: UsageFeatureChangesComponent;
  let fixture: ComponentFixture<UsageFeatureChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageFeatureChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageFeatureChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
