import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItem } from 'src/app/data/cartitem.entity';
import { CustomerOrder } from 'src/app/data/customerorder.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PlaceCustomerOrderComponent } from '../../modals/place-customer-order/place-customer-order.component';

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
    private cartItemService: CartService,
    private orderService: OrderService
  ) { }

  cartItems: CartItem[] = []

  ngOnInit(): void {
    if (!this.authenticator.isLoggedIn()) {
      this.openSnackBarAlert('To view the inventory, you need to log in first.')
      this.router.navigate(['/login']);
      return;
    }
    this.cartItemService.getCartItems()
      .pipe(tap((resp) => {
        this.cartItems = resp
        console.log(this.cartItems)
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

  onPlaceOrderClick() {
    if (this.authenticator.isCustomer()) {
      let customerAddress = "";
      this.authenticator.getAuthenticatedUserInfo()
        .pipe(tap((resp) => {
          customerAddress = (resp as any).company.address
        }))
        .subscribe(() => {
          let submitForm = this.fb.group({
            grandtotal: [{ value: this.cartTotal().toFixed(2) + " RON", disabled: true }],
            address: [customerAddress, Validators.required]
          })
          const dialogRef = this.dialog.open(PlaceCustomerOrderComponent, { width: '400px', maxHeight: '90vh', data: submitForm })
          dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
              console.log(submitForm)
              this.orderService.addOrder(new CustomerOrder({
                address: submitForm.value.address
              }))
                .pipe(tap((resp) => {
                  this.openSnackBar(`Order placed successfully.`);
                  this.cartItemService.getCartItems()
                    .pipe(tap((resp) => {
                      this.cartItems = resp
                      console.log(this.cartItems)
                    })).subscribe()
                }))
                .pipe(catchError((error: HttpErrorResponse) => {
                  this.openSnackBarAlert(`Could not place order. ${error.statusText}. (${error.status})`);
                  return EMPTY;
                }))
                .subscribe();
            }
          })
        })
    } else { }
  }

  canPlaceOrder() {
    return this.cartItems.length > 0
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

  cartTotal() {
    let total = 0.0;
    for (let i = 0; i < this.cartItems.length; i++) {
      total += (this.cartItems[i].item.unitprice * this.cartItems[i].qty);
    }
    return total;
  }

  onBackButtonClick() {
    this.router.navigate(['/inventory'])
  }

}
