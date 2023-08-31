import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationCreationComponent } from './illustration-creation.component';

describe('IllustrationCreationComponent', () => {
  let component: IllustrationCreationComponent;
  let fixture: ComponentFixture<IllustrationCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
