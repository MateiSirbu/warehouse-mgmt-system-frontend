import { Item } from "./item.entity";
import { User } from "./user.entity";

export class CartItem {
    id?: string;
    user?: User;
    item?: Item;
    qty?: number;

    public constructor(init?: Partial<CartItem>) {
        Object.assign(this, init)
    }
}
