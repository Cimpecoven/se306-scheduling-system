import { Component, OnInit } from '@angular/core';
import { CustomerAccount } from '../models/Accounts';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public form: FormGroup;

  public confirmFormControl = new FormControl('', [ValidatePassword, Validators.required]);

  public passwordWarning = false;
  public errorMessage = "";
  public successMessage = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.passwordWarning = false;
    this.form = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [ValidatePassword, Validators.required]),
    });
  }

  tryRegister(value) {
    if (value.password == "" || value.password != this.confirmFormControl.value) {
      this.passwordWarning = true;
      return;
    }

    if (this.form.errors || this.confirmFormControl.errors) {
      console.log(this.form.errors);
      console.log(this.confirmFormControl.errors);
      return;
    }

    this.authService.doRegisterCustomer(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigate(['/main']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }
}

export function ValidatePassword(control: AbstractControl) {

  // If there's a better way to do this: do it!
  if ((!control.value.includes('!') && 
      !control.value.includes('@') && 
      !control.value.includes('#') && 
      !control.value.includes('$') && 
      !control.value.includes('%') && 
      !control.value.includes('^') &&
      !control.value.includes('&') &&
      !control.value.includes('*')) || control.value.search('[A-Z]') === -1 || control.value.search('[0-9]') === -1)
      {
        return { validPassword: true }
      }
    else
      return null;
}
