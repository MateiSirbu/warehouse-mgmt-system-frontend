export class Employee {
    id?: string;
    isAdmin?: boolean;

    public constructor(init?: Partial<Employee>) {
        Object.assign(this, init)
    }
}
