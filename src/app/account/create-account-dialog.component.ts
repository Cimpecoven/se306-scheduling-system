import { Component, OnInit } from '@angular/core';
import { CustomerAccount } from '../models/Accounts';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent implements OnInit {

  public form = new FormGroup ({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [ValidatePassword, Validators.required]),
  });

  public confirmFormControl = new FormControl('', [ValidatePassword, Validators.required]);

  public passwordWarning = false;
  public errorMessage = "";
  public successMessage = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private dialogRef: MatDialogRef<CreateAccountDialogComponent>) { }

  ngOnInit() {
    this.passwordWarning = false;
  }

  tryRegister(value) {
    if (value.password == "" || value.password != this.confirmFormControl.value) {
      this.passwordWarning = true;
      return;
    }

    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.dialogRef.close();
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
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
