import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-stock-oh',
  templateUrl: './edit-stock-oh.component.html',
  styleUrls: ['./edit-stock-oh.component.css']
})
export class EditStockOHComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditStockOHComponent>,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}