import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusRejtableComponent } from './illustration-status-rejtable.component';

describe('IllustrationStatusRejtableComponent', () => {
  let component: IllustrationStatusRejtableComponent;
  let fixture: ComponentFixture<IllustrationStatusRejtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusRejtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusRejtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
