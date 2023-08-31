import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationstatusComponent } from './illustrationstatus.component';

describe('IllustrationstatusComponent', () => {
  let component: IllustrationstatusComponent;
  let fixture: ComponentFixture<IllustrationstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
