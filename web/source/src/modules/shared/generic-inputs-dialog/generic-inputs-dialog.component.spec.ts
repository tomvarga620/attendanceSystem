import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputsDialogComponent } from './generic-inputs-dialog.component';

describe('GenericInputsDialogComponent', () => {
  let component: GenericInputsDialogComponent;
  let fixture: ComponentFixture<GenericInputsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericInputsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInputsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
