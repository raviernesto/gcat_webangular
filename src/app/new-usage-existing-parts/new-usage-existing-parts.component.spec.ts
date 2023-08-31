import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsageExistingPartsComponent } from './new-usage-existing-parts.component';

describe('NewUsageExistingPartsComponent', () => {
  let component: NewUsageExistingPartsComponent;
  let fixture: ComponentFixture<NewUsageExistingPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUsageExistingPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsageExistingPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
