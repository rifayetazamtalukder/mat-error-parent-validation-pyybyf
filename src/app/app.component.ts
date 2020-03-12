import { Component } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm} from '@angular/forms';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));

    // If above return does not wroks then add !! before condition as below
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  userForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: '',
      password: '',
      verifyPassword: ''
    }, {
      validator: this.passwordValidator
    })
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }
}
