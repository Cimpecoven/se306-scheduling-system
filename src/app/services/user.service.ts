import { Injectable } from '@angular/core';
//import { AngularFireDatabase,  } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CustomerAccount, EmployeeAccount, IAccount } from '../models/Accounts';
import { map } from 'rxjs/operators'; 
import { EmployeeRoles } from '../models/EmployeeRoles';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private customerPath = '/customers';
  private employeePath = '/employees';
 
  public currentUser: Subject<IAccount>;

  customersRef: AngularFirestoreCollection<CustomerAccount> = null;
  employeesRef: AngularFirestoreCollection<EmployeeAccount> = null;
  
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.customerPath);
    this.employeesRef = db.collection(this.employeePath);
    this.currentUser = new Subject<IAccount>();
  }

  createCustomerAccount(account: CustomerAccount): void {
    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.userID == account.userID || compare.password == account.password)
            throw "Account credentials already exist: failed creation.";
        });
      },
      error => {
        console.log('Error: ', error);
        return;
      });

    //  this.customersRef.add({...account}).then(value => {
    //     account.databaseKey = value.id;
    //     this.customersRef.doc(value.id).update({...account});
    //   });

    this.customersRef.add({
      email: account.email,
      password: account.password,
      name: "",
      userID: account.userID,
      databaseKey: "",
    }).then(value => {
      account.databaseKey = value.id;
      this.customersRef.doc(value.id).update({...account});
    });
  }

  updateCustomerAccount(account: CustomerAccount): Promise<void> {
    return this.customersRef.doc(account.databaseKey).update(account);
  }

  deleteCustomerAccount(account: CustomerAccount) {
    return this.customersRef.doc(account.databaseKey).delete();
  }

  getCustomerAccount(email: string, password: string) {
    let errorMessage = "";
    
    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.email == email && compare.password == password) {
            this.currentUser.next(compare as CustomerAccount);
            return "";
          }
          else if (compare === null)
          {
            errorMessage = "Not a valid customer account."
          } 
          else
          {
            errorMessage = "Incorrect Email or password. Please Try Again";
          }
        }); 
      });

      return errorMessage;
  }

  getAllCustomerAccounts() {
    return this.customersRef.snapshotChanges();
  }

  createEmployeeAccount(account: EmployeeAccount) {
    this.employeesRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.userID == account.userID || compare.password == account.password)
            throw "Account credentials already exist: failed creation.";
        });
      },
      error => {
        console.log('Error: ', error);
        return;
      });

      if (account.status)
        account.status = EmployeeRoles.UnassignedEmployee;

      //this.employeesRef.doc(account.email).set({...account});
      this.employeesRef.add({
        email: account.email,
        password: account.password,
        name: "",
        userID: account.userID,
        databaseKey: "",
        status: account.status,
      }).then(value => {
        account.databaseKey = value.id;
        this.customersRef.doc(value.id).update({...account});
      });
  }

  updateEmployeeAccount(account: EmployeeAccount) {
    return this.employeesRef.doc(account.email).update(account);
  }

  deleteEmployeeAccount(account: EmployeeAccount) {
    return this.employeesRef.doc(account.email).delete();
  }

  getEmployeeAccount(userID: string, password: string): string {
    let errorMessage = "";

    this.employeesRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.userID == userID && compare.password == password) {
            this.currentUser.next(compare as EmployeeAccount);
            return "";
          } 
          else if (compare === null)
          {
            errorMessage = "Not a valid employee account."
          } 
          else
          {
            errorMessage = "Incorrect User ID or password. Please Try Again";
          }
        }); 
      });

      return errorMessage;
  }

  getAllEmployeeAccounts() {
    return this.employeesRef.snapshotChanges();
  }

  logOut() {
    this.currentUser.next(null);
  }

}
