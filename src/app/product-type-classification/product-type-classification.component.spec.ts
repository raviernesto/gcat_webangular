import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeClassificationComponent } from './product-type-classification.component';

describe('ProductTypeClassificationComponent', () => {
  let component: ProductTypeClassificationComponent;
  let fixture: ComponentFixture<ProductTypeClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
