import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusCoortableComponent } from './illustration-status-coortable.component';

describe('IllustrationStatusCoortableComponent', () => {
  let component: IllustrationStatusCoortableComponent;
  let fixture: ComponentFixture<IllustrationStatusCoortableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusCoortableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusCoortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
