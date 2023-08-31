import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresearchComponent } from './structuresearch.component';

describe('StructuresearchComponent', () => {
  let component: StructuresearchComponent;
  let fixture: ComponentFixture<StructuresearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructuresearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
