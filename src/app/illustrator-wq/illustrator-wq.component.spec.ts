import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratorWqComponent } from './illustrator-wq.component';

describe('IllustratorWqComponent', () => {
  let component: IllustratorWqComponent;
  let fixture: ComponentFixture<IllustratorWqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratorWqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratorWqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
