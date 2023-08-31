import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusArttableComponent } from './illustration-status-arttable.component';

describe('IllustrationStatusArttableComponent', () => {
  let component: IllustrationStatusArttableComponent;
  let fixture: ComponentFixture<IllustrationStatusArttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusArttableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusArttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
