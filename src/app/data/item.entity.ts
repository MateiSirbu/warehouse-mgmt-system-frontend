export class Item {
    id: string;
    ean: string;
    name: string;
    uom: string;

    public constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }
}
