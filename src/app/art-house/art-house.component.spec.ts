import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtHouseComponent } from './art-house.component';

describe('ArtHouseComponent', () => {
  let component: ArtHouseComponent;
  let fixture: ComponentFixture<ArtHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
