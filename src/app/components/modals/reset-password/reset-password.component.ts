import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private fb: FormBuilder
  ) { }

  public form: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: "",
      newPassword: "",
      verifyNewPassword: ""
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
