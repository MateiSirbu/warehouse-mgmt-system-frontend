import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item } from 'src/app/data/item.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    public authenticator: AuthenticatorService,
    private router: Router) { }

  items: Item[]

  ngOnInit(): void {
    if (!this.authenticator.isLoggedIn()) {
      this.openSnackBarAlert('To view the inventory, you need to log in first.')
      this.router.navigate(['/login']);
      return;
    }
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
    return ['sku', 'ean', 'name',
      'unitprice', 'stock', 'actions'
    ];
  }
}
