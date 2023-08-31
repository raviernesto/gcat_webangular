import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusWitoutableComponent } from './illustration-status-witoutable.component';

describe('IllustrationStatusWitoutableComponent', () => {
  let component: IllustrationStatusWitoutableComponent;
  let fixture: ComponentFixture<IllustrationStatusWitoutableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusWitoutableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusWitoutableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
