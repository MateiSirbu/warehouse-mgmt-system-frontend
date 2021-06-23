export class Item {
    id?: string;
    sku?: string;
    ean?: number;
    name?: string;
    uom?: string;
    unitprice?: number;
    stock?: number;
    availableQty?: number;

    public constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }
}
