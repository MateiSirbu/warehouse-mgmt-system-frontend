import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { COLine } from 'src/app/data/coline.entity';
import { CustomerOrder } from 'src/app/data/customerorder.entity';
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

  orderId: string;
  orderItems: COLine[] = []
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params.id;
    })
    this.orderService.getCustOrderById(this.orderId)
      .pipe(tap((resp) => {
        this.orderItems = (resp as CustomerOrder).lines
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.statusText}. (${error.status})`);
        return EMPTY;
      }))
      .subscribe();
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

  onBackButtonClick() {
    this.router.navigate(['/login'])
  }

  onFillItemClick(item) {

  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 10000,
      panelClass: ['my-snack-bar-alert']
    });
  }

}
