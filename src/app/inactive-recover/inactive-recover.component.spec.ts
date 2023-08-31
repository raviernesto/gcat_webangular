import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveRecoverComponent } from './inactive-recover.component';

describe('InactiveRecoverComponent', () => {
  let component: InactiveRecoverComponent;
  let fixture: ComponentFixture<InactiveRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveRecoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
