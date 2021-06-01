import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItem } from 'src/app/data/cartitem.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public authenticator: AuthenticatorService,
    private router: Router,
    private cartItemService: CartItemService
  ) { }

  cartItems: CartItem[]

  ngOnInit(): void {
    if (!this.authenticator.isLoggedIn()) {
      this.openSnackBarAlert('To view the inventory, you need to log in first.')
      this.router.navigate(['/login']);
      return;
    }
    this.cartItemService.getCartItems()
      .pipe(tap((resp) => {
        this.cartItems = resp
        console.log(resp)
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`Could not fetch your cart items. ${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
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
    return ['name', 'unitprice', 'qty', 'price', 'actions'];
  }

  onClearCartClick() {
    this.cartItemService.clearCart()
      .pipe(tap((resp) => {
        this.cartItemService.getCartItems()
          .pipe(tap((resp) => {
            this.cartItems = resp
            this.openSnackBar(`Cart cleared.`);
          })).subscribe()
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`Could not clear your cart. ${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
  }

  onDeleteItemClick(item: CartItem) {
    this.cartItemService.deleteCartItem(item)
      .pipe(tap((resp) => {
        this.cartItemService.getCartItems()
          .pipe(tap((resp) => {
            this.cartItems = resp
            this.openSnackBar(`Cart item removed.`);
          })).subscribe()
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`Could not remove item. ${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
  }

  onBackButtonClick() {
    this.router.navigate(['/inventory'])
  }

}
