import { Injectable } from '@angular/core';
//import { AngularFireDatabase,  } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CustomerAccount, EmployeeAccount } from '../models/Accounts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private customerPath = '/customers';
  private employeePath = '/employees';
 
  customersRef: AngularFirestoreCollection<CustomerAccount> = null;
  employeesRef: AngularFirestoreCollection<EmployeeAccount> = null;
  
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.customerPath);
    this.employeesRef = db.collection(this.employeePath);
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

      this.customersRef.add({...account});
  }

  updateCustomerAccount(account: CustomerAccount): Promise<void> {
    return this.customersRef.doc(account.databaseKey).update(account);
  }

  deleteCustomerAccount(customerKey: string) {
    return this.customersRef.doc(customerKey).delete();
  }

  getCustomerAccount(account: CustomerAccount) {

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

      this.employeesRef.add({...account});
  }

  updateEmployeeAccount(account: EmployeeAccount) {
    return this.employeesRef.doc(account.databaseKey).update(account);
  }

  deleteEmployeeAccount(employeeKey: string) {
    return this.customersRef.doc(employeeKey).delete();
  }

  getEmployeeAccount(account: EmployeeAccount) {
    
  }
}
