import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-cofilled-qty',
  templateUrl: './edit-cofilled-qty.component.html',
  styleUrls: ['./edit-cofilled-qty.component.css']
})
export class EditCOFilledQtyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditCOFilledQtyComponent>,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
