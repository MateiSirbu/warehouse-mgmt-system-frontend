import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authenticator: AuthenticatorService
  ) { }

  public form: FormGroup

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: this.fb.control('', Validators.required),
      newPassword: this.fb.control('', Validators.required),
      verifyNewPassword: this.fb.control('', Validators.required)
    })
  }

  onSubmitClick() {
    if (this.form.controls['newPassword'].value != this.form.controls['verifyNewPassword'].value) {
      this.openSnackBarAlert('The new password cannot be verified, please try again.')
      return;
    }
    this.form.disable()
    let reqBody = {
      oldPassword: this.form.controls['oldPassword'].value,
      newPassword: this.form.controls['newPassword'].value
    }
    this.authenticator.resetPassword(reqBody)
      .pipe(tap((res) => {
        this.dialogRef.close(true);
      }), catchError((err: HttpErrorResponse) => {
        this.form.enable();
        this.openSnackBarAlert(`Cannot reset password. ${err.statusText}. (${err.status})`);
        return EMPTY;
      }))
      .subscribe();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['my-snack-bar-alert']
    });
  }
}
