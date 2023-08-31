import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrpListComponent } from './irp-list.component';

describe('IrpListComponent', () => {
  let component: IrpListComponent;
  let fixture: ComponentFixture<IrpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
