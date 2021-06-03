import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../data/cartitem.entity';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  addCartItem(item: CartItem) {
    return this.http.post('/api/cart', item);
  }

  editCartItem(item: CartItem) {
    return this.http.put('/api/cart', item);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>('/api/cart');
  }

  deleteCartItem(item: CartItem) {
    return this.http.delete('/api/cart/' + item.id)
  }

  clearCart() {
    return this.http.delete('/api/cart');
  }
}
