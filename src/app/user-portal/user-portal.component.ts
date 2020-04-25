import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CustomerAccount } from '../models/Accounts';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss']
})
export class UserPortalComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {

  }

  tryEdit(value) {
    this.service.updateCustomerAccount(value as CustomerAccount);
  }
}
