import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageInformationComponent } from './usage-information.component';

describe('UsageInformationComponent', () => {
  let component: UsageInformationComponent;
  let fixture: ComponentFixture<UsageInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
