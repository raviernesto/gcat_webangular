import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexiconSearchComponent } from './lexicon-search.component';

describe('LexiconSearchComponent', () => {
  let component: LexiconSearchComponent;
  let fixture: ComponentFixture<LexiconSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexiconSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiconSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
