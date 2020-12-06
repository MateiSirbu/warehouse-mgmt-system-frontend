import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/data/user.entity';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    public authenticator: AuthenticatorService,
    private route: Router) { }

  inputEnabled = true;

  model = new User({
    email: "",
    hash: ""
  })

  userName: string;

  ngOnInit(): void {
    if (this.authenticator.isLoggedIn()) {
      this.authenticator.getAuthenticatedUserInfo()
        .pipe(tap((res) => {
          this.userName = res.firstName + ' ' + res.lastName
        }), catchError(err => { return EMPTY; }))
        .subscribe();
    }
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
              this.userName = res.firstName + ' ' + res.lastName
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
          this.openSnackBarAlert(`${error.status}: ${error.statusText}. Cannot log in.`);
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
