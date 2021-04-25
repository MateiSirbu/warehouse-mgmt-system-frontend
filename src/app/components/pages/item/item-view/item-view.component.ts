import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';
import { Item } from 'src/app/data/item.entity';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  items: Item[]
  selection = new SelectionModel<Item>(true, []);

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private itemService: ItemService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  fetchHeader() {
    return ['select', 'sku', 'ean',
      'name', 'unitprice', 'actions'
    ];
  }

  onAddItemClick() {
    let newItemForm = this.fb.group({
      sku: ['', Validators.required],
      ean: ['', Validators.required],
      name: ['', Validators.required],
      uom: ['', Validators.required],
      unitprice: ['', Validators.required],
    })
    const dialogRef = this.dialog.open(AddItemComponent, { width: '400px', maxHeight: '90vh', data: newItemForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let newItem: Item = {
          sku: newItemForm.value.sku,
          ean: newItemForm.value.ean,
          name: newItemForm.value.name,
          uom: newItemForm.value.uom,
          unitprice: newItemForm.value.unitprice,
          stock: 0
        }
        this.itemService.addItem(newItem)
          .pipe(tap((resp) => {
            this.openSnackBar('Done.')
            this.itemService.getItems()
              .pipe(tap((resp) => {
                this.items = resp
              }))
              .subscribe();
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBarAlert(`${error.status}: ${error.statusText}. Could not add item.`);
            return EMPTY;
          }))
          .subscribe();
      }
    })
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

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['my-snack-bar-alert']
    });
  }
}
