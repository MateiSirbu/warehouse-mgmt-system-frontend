import { CustomerOrder } from "./customerorder.entity";
import { Item } from "./item.entity";

export class COLine {
    id?: string;
    order: CustomerOrder
    item: Item
    qty: number
    filledQty: number;

    public constructor(init?: Partial<COLine>) {
        Object.assign(this, init)
    }
}
