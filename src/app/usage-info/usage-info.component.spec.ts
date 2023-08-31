import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageInfoComponent } from './usage-info.component';

describe('UsageInfoComponent', () => {
  let component: UsageInfoComponent;
  let fixture: ComponentFixture<UsageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
