export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    salt: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init)
    }
}
