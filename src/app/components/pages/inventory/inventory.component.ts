import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItem } from 'src/app/data/cartitem.entity';
import { Item } from 'src/app/data/item.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { AddToCartComponent } from '../../modals/add-to-cart/add-to-cart.component';
import { EditStockOHComponent } from '../../modals/edit-stock-oh/edit-stock-oh.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public authenticator: AuthenticatorService,
    private router: Router,
    private itemService: ItemService,
    private cartItemService: CartService
  ) { }

  items: Item[]

  ngOnInit(): void {
    if (!this.authenticator.isLoggedIn()) {
      this.openSnackBarAlert('To view the inventory, you need to log in first.')
      this.router.navigate(['/login']);
      return;
    }
    this.itemService.getItems()
      .pipe(tap((resp) => {
        console.log(resp)
        this.items = resp
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`Could not fetch items. ${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
  }

  onEditItemClick(item) {
    let selectedItemForm = this.fb.group({
      stock: [{ value: item.stock, disabled: false }, Validators.required],
    })
    const dialogRef = this.dialog.open(EditStockOHComponent, { width: '400px', maxHeight: '90vh', data: selectedItemForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let selectedItem: Item = {
          id: item.id,
          sku: item.sku,
          ean: item.ean,
          name: item.name,
          uom: item.uom,
          unitprice: item.unitprice,
          stock: selectedItemForm.value.stock
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
            this.openSnackBarAlert(`Could not edit item stock. ${error.statusText}. (${error.status})`);
            return EMPTY;
          }))
          .subscribe();
      }
    })
  }

  onAddCartItemClick(item: Item) {
    let selectedItemForm = this.fb.group({
      productName: [{ value: item.name, disabled: true }, Validators.required],
      qty: [1, Validators.required]
    })
    const dialogRef = this.dialog.open(AddToCartComponent, { width: '400px', maxHeight: '90vh', data: selectedItemForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let selectedCartItem: CartItem = {
          item: item,
          qty: selectedItemForm.value.qty,
        }
        this.cartItemService.addCartItem(selectedCartItem).pipe(tap((resp) => {
          this.openSnackBar(`Added item to cart.`);
        }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBarAlert(`Could not add to cart. ${error.statusText}. (${error.status})`);
            return EMPTY;
          }))
          .subscribe();
      }
    })
  }

  navigateToCart() {
    this.router.navigate(['/cart'])
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 10000,
      panelClass: ['my-snack-bar-alert']
    });
  }

  fetchHeader() {
    return ['name', 'ean', 'unitprice', 'stock', 'available', 'actions'];
  }
}
