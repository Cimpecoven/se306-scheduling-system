import { EmployeeRoles } from './EmployeeRoles';

export interface IAccount {
    databaseKey: string;
    userID: string;
    password: string;
    email: string;
}

export class CustomerAccount implements IAccount {
    databaseKey: string;
    name?: string;
    userID: string;
    password: string;
    email: string;

    constructor (email: string, password: string, name?: string) {
        this.email = email;
        this.password = password;
        this. userID = email;

        if (name)
            this.name = name;
    }
}

export class EmployeeAccount implements IAccount {
    databaseKey: string;
    name?: string;
    userID: string;
    password: string;
    email: string;
    status: EmployeeRoles;

    constructor (email: string, password: string, status?: number) {
        this.email = email;
        this.password = password;

        if (status)
            this.status = status;
    }
}

 export const CustomerAccountConverter = {
    toFirestore(customer: CustomerAccount) {
        return {
            name: customer.name,
            email: customer.email,
            password: customer.password,
            userID: customer.userID
            }
    },
    fromFirestore(snapshot, options){
        const data = snapshot.data(options);
        return new CustomerAccount(data.email, data.password, data.name)
    }
 }

 export const EmployeeAccountConverter = {
    toFirestore(employee: EmployeeAccount) {
        return {
            name: employee.name,
            email: employee.email,
            password: employee.password,
            userID: employee.userID,
            status: employee.status
            }
    },
    fromFirestore(snapshot, options){
        const data = snapshot.data(options);
        return new CustomerAccount(data.email, data.password, data.status)
    }
}