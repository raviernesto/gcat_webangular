import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexiconCodeComponent } from './lexicon-code.component';

describe('LexiconCodeComponent', () => {
  let component: LexiconCodeComponent;
  let fixture: ComponentFixture<LexiconCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexiconCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiconCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
