import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosepublicationdateRaviComponent } from './closepublicationdate-ravi.component';

describe('ClosepublicationdateRaviComponent', () => {
  let component: ClosepublicationdateRaviComponent;
  let fixture: ComponentFixture<ClosepublicationdateRaviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosepublicationdateRaviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosepublicationdateRaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
