import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCopyComponent } from './section-copy.component';

describe('SectionCopyComponent', () => {
  let component: SectionCopyComponent;
  let fixture: ComponentFixture<SectionCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
