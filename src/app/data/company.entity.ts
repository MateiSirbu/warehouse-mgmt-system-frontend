export class Company {
    id?: string;
    name: string;
    address: string;

    public constructor(init?: Partial<Company>) {
        Object.assign(this, init)
    }
}