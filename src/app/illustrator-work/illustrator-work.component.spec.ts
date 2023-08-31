import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratorWorkComponent } from './illustrator-work.component';

describe('IllustratorWorkComponent', () => {
  let component: IllustratorWorkComponent;
  let fixture: ComponentFixture<IllustratorWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratorWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratorWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
