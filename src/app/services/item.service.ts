import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../data/item.entity';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  addItem(item: Item) {
    return this.http.post('/api/item', item);
  }

  editItem(item: Item) {
    return this.http.put('/api/item', item);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/item');
  }

}
