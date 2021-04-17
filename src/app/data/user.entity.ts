import { Company } from "./company.entity";
import { Customer } from "./customer.entity";
import { Employee } from "./employee.entity";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    salt: string;
    role: string;
    customer: Customer;
    employee: Employee;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init)
    }
}
