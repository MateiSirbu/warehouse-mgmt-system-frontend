import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/data/item.entity';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  items: Item[]
  selection = new SelectionModel<Item>(true, []);

  constructor() { }

  ngOnInit(): void {
  }

  fetchHeader() {
    return ['select', 'sku', 'ean', 'name',
      'unitprice', 'actions'
    ];
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.items.length;
    return selectedItems === numOfRows;
  }

  masterToggle() {
    this.isAllItemsSelected()
      ? (this.selection.clear())
      : (this.items.forEach(row => {
        this.selection.select(row);
      }))
  }

}
