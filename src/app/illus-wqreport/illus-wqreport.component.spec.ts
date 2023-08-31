import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllusWqreportComponent } from './illus-wqreport.component';

describe('IllusWqreportComponent', () => {
  let component: IllusWqreportComponent;
  let fixture: ComponentFixture<IllusWqreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllusWqreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllusWqreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
