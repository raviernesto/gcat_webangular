import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexiconmanagementComponent } from './lexiconmanagement.component';

describe('LexiconmanagementComponent', () => {
  let component: LexiconmanagementComponent;
  let fixture: ComponentFixture<LexiconmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexiconmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiconmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
