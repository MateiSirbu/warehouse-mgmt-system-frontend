export class Item {
    id?: string;
    sku?: string;
    ean?: string;
    name?: string;
    uom?: string;
    price?: number;
    currency?: string;
    stock?: number;
    
    public constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }
}
