import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/data/user.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../../modals/reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    public authenticator: AuthenticatorService,
    private route: Router,
    public dialog: MatDialog) { }

  inputEnabled = true;

  model = new User({
    email: "",
    hash: ""
  })

  authenticatedUser: any;

  ngOnInit(): void {
    if (this.authenticator.isLoggedIn()) {
      this.authenticator.getAuthenticatedUserInfo()
        .pipe(tap((res) => {
          this.authenticatedUser = res;
          console.log(this.authenticatedUser)
        }), catchError(err => { return EMPTY; }))
        .subscribe();
    }
    this.authenticator.isOobe()
      .pipe(tap((resp: { isOobe: boolean }) => {
        if (resp.isOobe == true) {
          this.route.navigate(['/oobe'])
          this.openSnackBar(`Welcome to WMS!`);
        }
      }))
      .subscribe()
  }

  onSubmit() {
    this.openSnackBar(`Logging you in...`);
    this.inputEnabled = false;
    this.model.email = this.model.email.toLowerCase();
    this.authenticator.logIn(this.model.email, this.model.hash)
      .pipe(tap((resp) => {
        if (resp != null) {
          this.openSnackBar(`Login successful.`);
          this.authenticator.getAuthenticatedUserInfo()
            .pipe(tap((res) => {
              this.authenticatedUser = res;
              console.log(this.authenticatedUser)
            }), catchError(err => { return EMPTY; }))
            .subscribe();
        }
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.model.email = '';
          this.model.hash = '';
          this.openSnackBarAlert(`No account is associated with this e-mail address.`);
        }
        else if (error.status == 401) {
          this.model.hash = '';
          this.openSnackBarAlert(`Incorrect credentials, please try again.`);
        }
        else
          this.openSnackBarAlert(`${error.status}: Cannot log in. ${error.statusText}.`);
        this.inputEnabled = true;
        return EMPTY;
      }))
      .subscribe()
  }

  navigateToInventoryList() {
    this.route.navigate(['/inventory']);
  }

  navigateToSignUp() {
    this.route.navigate(['/signup']);
  }

  onResetPasswordClick() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, { width: '400px', maxHeight: '90vh' })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.openSnackBar('Your password has been reset successfully.')
      }
    })
  }

  logOut() {
    this.authenticator.logOut();
    this.model.email = '';
    this.model.hash = '';
    this.inputEnabled = true;
    this.openSnackBar(`You have been logged out.`);
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
