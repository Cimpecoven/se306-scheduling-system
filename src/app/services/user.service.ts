import { Injectable } from '@angular/core';
//import { AngularFireDatabase,  } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CustomerAccount, EmployeeAccount, IAccount } from '../models/Accounts';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private customerPath = '/customers';
  private employeePath = '/employees';
 
  public currentUser: IAccount;

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
    return this.customersRef.doc(account.email).update(account);
  }

  deleteCustomerAccount(account: CustomerAccount) {
    return this.customersRef.doc(account.email).delete();
  }

  // getCustomerAccount(account: CustomerAccount) {

  // }

  getCustomerAccount(email: string, password: string) {

    // this.customersRef.doc<CustomerAccount>().get().subscribe(doc => {
    //   if (doc.exists)
    //     customer = doc.data() as CustomerAccount;
      
    //   else
    //     throw "Account doesn't exist: failed retrieval."
    // },  
    // error => {
    //   console.log('Error: ', error);
    //   return;
    // });

    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.email == email || compare.password == password) {
            this.currentUser = compare as CustomerAccount;
            return;
          }  
        }); 
      },
      error => {
        console.log('Error: ', error);
        return;
      });
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

      this.employeesRef.doc(account.email).set({...account});
  }

  updateEmployeeAccount(account: EmployeeAccount) {
    return this.employeesRef.doc(account.email).update(account);
  }

  deleteEmployeeAccount(account: EmployeeAccount) {
    return this.customersRef.doc(account.email).delete();
  }

  // getEmployeeAccount(account: EmployeeAccount) {
    
  // }

  getEmployeeAccount(email: string, password: string) {

    // this.employeesRef.doc<EmployeeAccount>(email + '_' + password).get().subscribe(doc => {
    //   if (doc.exists)
    //     employee = doc.data() as EmployeeAccount;
      
    //   else
    //     throw "Account doesn't exist: failed retrieval."
    // },  
    // error => {
    //   console.log('Error: ', error);
    //   return;
    // });

    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.email == email || compare.password == password) {
            this.currentUser = compare as EmployeeAccount;
            return;
          }  
        }); 
      },
      error => {
        console.log('Error: ', error);
        return;
      });
  }

  getAllEmployeeAccounts() {
    return this.employeesRef.snapshotChanges();
  }
}
