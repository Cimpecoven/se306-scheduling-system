import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmployeeAccount, IAccount, CustomerAccount } from '../models/Accounts';
import { UserService } from './user.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private service: UserService) { }
  
  public databaseAccount: IAccount;

  doRegisterCustomer(value) {

    if(firebase.auth().currentUser)
      firebase.auth().signOut();

    return new Promise<any>((resolve, reject) => {
      this.service.createCustomerAccount(new CustomerAccount(value.email, value.password));
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    });
  }

  doSignIn(value, isEmployeeAccount: boolean) {

    if(firebase.auth().currentUser)
      firebase.auth().signOut();

    if (isEmployeeAccount) {
      this.databaseAccount = this.service.getEmployeeAccount(value.email, value.password);
    }
    else {
      this.databaseAccount = this.service.getCustomerAccount(value.email, value.password);
    }

    if (!this.databaseAccount)
      throw "No account in the database corresponds to that user.";

    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    });
  }
}
