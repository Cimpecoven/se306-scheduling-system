import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { ValidatePassword } from '../create-account/create-account.component';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public confirmFormControl = new FormControl('', [ValidatePassword, Validators.required]);

  public isEmployeeAccount = false;
  public accountType = "Customer";
  public passwordWarning = false;
  public errorMessage = "";
  public successMessage = "";

  constructor(private fb: FormBuilder, private service: UserService,  private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.passwordWarning = false;
    this.form = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [ValidatePassword, Validators.required]),
    });
  }

  changeAccountType() {
    this.isEmployeeAccount = !this.isEmployeeAccount;
    if (this.isEmployeeAccount)
      this.accountType = "Employee";
    else
      this.accountType = "Customer";
  }
  
  tryLogin(value) {
    if (value.password == "" || value.password != this.confirmFormControl.value) {
      this.passwordWarning = true;
      return;
    }

    if (this.form.errors || this.confirmFormControl.errors) {
      return;
    }

    if (this.isEmployeeAccount)
      this.errorMessage = this.service.getEmployeeAccount(value.email, value.password);
    else
      this.errorMessage = this.service.getCustomerAccount(value.email, value.password);

    if (!this.errorMessage)
      this.dialogRef.close();
  }
}
