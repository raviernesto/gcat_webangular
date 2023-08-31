import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusTableComponent } from './illustration-status-table.component';

describe('IllustrationStatusTableComponent', () => {
  let component: IllustrationStatusTableComponent;
  let fixture: ComponentFixture<IllustrationStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
