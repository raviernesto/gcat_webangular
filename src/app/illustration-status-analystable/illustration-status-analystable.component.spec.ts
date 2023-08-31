import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusAnalystableComponent } from './illustration-status-analystable.component';

describe('IllustrationStatusAnalystableComponent', () => {
  let component: IllustrationStatusAnalystableComponent;
  let fixture: ComponentFixture<IllustrationStatusAnalystableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusAnalystableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusAnalystableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
