import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerOrder } from '../data/customerorder.entity';

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
  constructor(
    private http: HttpClient
  ) { }
}
