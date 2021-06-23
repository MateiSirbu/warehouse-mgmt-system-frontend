import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { COLine } from '../data/coline.entity';
import { CustomerOrder, OrderStatus } from '../data/customerorder.entity';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getCustOrderById(id: string) {
    return this.http.get<CustomerOrder>('/api/order/' + id);
  }

  addOrder(item: any) {
    return this.http.post('/api/order', item);
  }

  getCustOrders() {
    return this.http.get<CustomerOrder[]>('/api/order');
  }

  fillItem(line: COLine) {
    return this.http.post('/api/order/fill', line);
  }

  updateCustOrderStatus(id: string, status: OrderStatus) {
    return this.http.post('/api/order/' + id, { status: status })
  }
  constructor(
    private http: HttpClient
  ) { }
}
