import { HttpErrorResponse } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-http-error',
  templateUrl: './form-http-error.component.html',
  styleUrls: ['./form-http-error.component.css']
})
export class FormHttpErrorComponent implements OnInit {
  // @Input() httpErrorMessage: number;
  @Input() httpError: HttpErrorResponse;

  constructor() {

  }

  ngOnInit(): void {}

}
