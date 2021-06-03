import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-place-customer-order',
  templateUrl: './place-customer-order.component.html',
  styleUrls: ['./place-customer-order.component.css']
})
export class PlaceCustomerOrderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlaceCustomerOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup
  ) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
