import { COLine } from "./coline.entity";
import { Customer } from "./customer.entity";

export enum OrderStatus {
    Placed,
    Cancelled,
    Processing,
    Closed
}

export class CustomerOrder {
    id?: string
    customer?: Customer
    lines: COLine[]
    address: string
    date: number
    status: OrderStatus
    public constructor(init?: Partial<CustomerOrder>) {
        Object.assign(this, init)
    }
}
