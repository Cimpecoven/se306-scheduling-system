import { Component, OnInit } from '@angular/core';
import { CustomerAccount } from '../models/Accounts';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  passwordFormControl = new FormControl('', [ValidatePassword, Validators.required]);
  confirmFormControl = new FormControl('', [ValidatePassword, Validators.required]);

  public newAccount: CustomerAccount;

  passwordWarning = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newAccount = new CustomerAccount();
    this.passwordWarning = false;
  }

  addNewAccount() {

    if (this.passwordFormControl.value === this.confirmFormControl.value)
      this.newAccount.password = this.passwordFormControl.value;

    else
      {
        this.passwordWarning = true;
        return;
      }
    this.newAccount.email = this.emailFormControl.value;
  }

}

export function ValidatePassword(control: AbstractControl) {
  let strang: string;
  strang
  // If there's a better way to do this: do it!
  if ((control.value.includes('!') || 
      control.value.includes('@') || 
      control.value.includes('#') || 
      control.value.includes('$') || 
      control.value.includes('%') || 
      control.value.includes('^') ||
      control.value.includes('&') ||
      control.value.includes('*')) && control.value.search('[A-Z]') != -1 && control.value.search('[0-9]') != -1)
      {
        return { validPassword: true }
      }
    else
      return null;
}
