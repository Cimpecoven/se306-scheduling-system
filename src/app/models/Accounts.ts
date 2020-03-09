import { EmployeeRoles } from './EmployeeRoles';

class IAccount {
    databaseKey: string;
    userID: string;
    password: string;
    email: string;
}

export class CustomerAccount extends IAccount {
    databasekey: string;
    name?: string;
    userID: string;
    password: string;
    email: string;
}

export class EmployeeAccount {
    databaseKey: string;
    name?: string;
    userID: string;
    password: string;
    email: string;
    status: EmployeeRoles;
}