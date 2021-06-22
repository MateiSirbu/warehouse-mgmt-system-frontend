import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { COLine } from 'src/app/data/coline.entity';
import { CustomerOrder, OrderStatus } from 'src/app/data/customerorder.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-custorder',
  templateUrl: './custorder.component.html',
  styleUrls: ['./custorder.component.css']
})
export class CustorderComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    public auth: AuthenticatorService
  ) { }

  order: CustomerOrder
  orderId: string
  orderItems: COLine[] = []

  fetchOrderItems() {
    this.orderService.getCustOrderById(this.orderId)
      .pipe(tap((resp) => {
        this.order = (resp as CustomerOrder)
        this.orderItems = (resp as CustomerOrder).lines
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params.id;
    })
    this.fetchOrderItems()
  }

  fetchHeader() {
    if (this.auth.isEmployee())
      return ['name', 'unitprice', 'qty', 'filledQty', 'price', 'actions'];
    else
      return ['name', 'unitprice', 'qty', 'price'];
  }

  cartTotal() {
    let total = 0.0;
    for (let i = 0; i < this.orderItems.length; i++) {
      total += (this.orderItems[i].item.unitprice * this.orderItems[i].qty);
    }
    return total;
  }

  canCloseOrder() {
    let status = true
    if ((this.order.status == OrderStatus.Cancelled) || (this.order.status == OrderStatus.Closed))
      status = false
    this.orderItems.forEach(orderItem => {
      if (orderItem.qty != orderItem.filledQty)
        status = false
    });
    return status
  }
  canFillOrder() {
    let status = true
    if ((this.order.status == OrderStatus.Cancelled) || (this.order.status == OrderStatus.Closed))
      status = false
    return status
  }

  onBackButtonClick() {
    this.router.navigate(['/login'])
  }

  onCancelOrderClick() {
    this.orderService.updateCustOrderStatus(this.orderId, OrderStatus.Cancelled)
      .pipe(tap((res) => {
        this.openSnackBar(res)
        this.fetchOrderItems()
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe()
  }

  onCloseOrderClick() {
    this.orderService.updateCustOrderStatus(this.orderId, OrderStatus.Closed)
      .pipe(tap((res) => {
        this.openSnackBar(res)
        this.fetchOrderItems()
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe()
  }

  onFillItemClick(item) {

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

}
