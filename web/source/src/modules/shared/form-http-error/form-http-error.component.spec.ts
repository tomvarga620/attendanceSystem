import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHttpErrorComponent } from './form-http-error.component';

describe('FormHttpErrorComponent', () => {
  let component: FormHttpErrorComponent;
  let fixture: ComponentFixture<FormHttpErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHttpErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
