export class Customer {
    id: string;
    companyName: string;

    public constructor(init?: Partial<Customer>) {
        Object.assign(this, init)
    }
}
