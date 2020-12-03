import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {
  @Input() errors: ValidationErrors;

  constructor() { }

  ngOnInit(): void {
  }

}
