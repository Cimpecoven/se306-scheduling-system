import { Component, OnInit } from '@angular/core';
import { CustomerAccount } from '../models/Accounts';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidatePassword } from '../create-account/create-account.component';


@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss']
})
export class UserPortalComponent implements OnInit {

  public currentUser: any;
  public form: FormGroup;
  public passwordWarning = false;

  public confirmFormControl = new FormControl('', [ValidatePassword]);

  constructor(private router: Router, private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {  
    this.service.currentUser.subscribe(user => {        
      this.currentUser = user;
    });

    if (!this.currentUser)
      this.router.navigate(['/main']);

    this.form = this.fb.group({
      email: new FormControl(this.currentUser.email, [Validators.email]),
      name: new FormControl(this.currentUser.name),
      password: new FormControl(this.currentUser.password, [ValidatePassword]),
    });
  }

  tryEdit(value) {
    this.currentUser.email = value.email ? value.email : this.currentUser.email;
    this.currentUser.name = value.name ? value.name : this.currentUser.name;

    if (value.password && value.password == this.currentUser.password) {
      this.currentUser.password = value.password;
      this.passwordWarning = false;
    }

    if (value.password && value.password != this.confirmFormControl.value) {
      this.passwordWarning = true;
      return;
    }

    this.service.updateCustomerAccount(this.currentUser);
    this.router.navigate(['/main']);
  }

  logout() {
    this.service.logOut();
    this.router.navigate(['/main']);
  }
}
