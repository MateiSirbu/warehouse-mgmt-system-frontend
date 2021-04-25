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
import { EditItemComponent } from '../../modals/edit-item/edit-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[]
  selection = new SelectionModel<Item>(true, []);

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private itemService: ItemService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.itemService.getItems()
      .pipe(tap((resp) => {
        this.items = resp
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`Could not fetch items. ${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
  }

  fetchHeader() {
    return ['select', 'sku', 'ean', 'name', 'unitprice', 'actions'];
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
            this.openSnackBarAlert(`Could not add item. ${error.statusText}. (${error.status})`);
            return EMPTY;
          }))
          .subscribe();
      }
    })
  }

  onEditItemClick(item: Item) {
    let selectedItemForm = this.fb.group({
      sku: [{ value: item.sku, disabled: true }, Validators.required],
      ean: [item.ean, Validators.required],
      name: [item.name, Validators.required],
      uom: [item.uom, Validators.required],
      unitprice: [item.unitprice, Validators.required],
    })
    const dialogRef = this.dialog.open(EditItemComponent, { width: '400px', maxHeight: '90vh', data: selectedItemForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let selectedItem: Item = {
          id: item.id,
          sku: item.sku,
          ean: selectedItemForm.value.ean,
          name: selectedItemForm.value.name,
          uom: selectedItemForm.value.uom,
          unitprice: selectedItemForm.value.unitprice,
          stock: 0
        }
        console.log(selectedItem)
        this.itemService.editItem(selectedItem)
          .pipe(tap((resp) => {
            this.openSnackBar('Done.')
            this.itemService.getItems()
              .pipe(tap((resp) => {
                this.items = resp
              }))
              .subscribe();
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBarAlert(`Could not add item. ${error.statusText}. (${error.status})`);
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