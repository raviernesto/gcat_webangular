import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationStatusOprnirpsComponent } from './illustration-status-oprnirps.component';

describe('IllustrationStatusOprnirpsComponent', () => {
  let component: IllustrationStatusOprnirpsComponent;
  let fixture: ComponentFixture<IllustrationStatusOprnirpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationStatusOprnirpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationStatusOprnirpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
