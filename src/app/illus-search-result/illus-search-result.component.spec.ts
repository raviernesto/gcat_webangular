import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllusSearchResultComponent } from './illus-search-result.component';

describe('IllusSearchResultComponent', () => {
  let component: IllusSearchResultComponent;
  let fixture: ComponentFixture<IllusSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllusSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllusSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
