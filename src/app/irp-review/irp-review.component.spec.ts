import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrpReviewComponent } from './irp-review.component';

describe('IrpReviewComponent', () => {
  let component: IrpReviewComponent;
  let fixture: ComponentFixture<IrpReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
