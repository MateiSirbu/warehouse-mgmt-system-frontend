import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from "rxjs/operators"
import { User } from '../data/user.entity';
import * as moment from "moment"

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private http: HttpClient) {
    if (this.isLoggedIn()) {
      this.getAuthenticatedUserInfo()
        .pipe(tap((res) => {
          this.userName = res.firstName + ' ' + res.lastName
        })).subscribe();
    }
  }
  private userName: string = '';

  logIn(email: string, password: string) {
    return this.http.post('/api/login/', { email: email, password: password })
      .pipe(tap(res => this.setSession(res)), shareReplay());
  }

  signUp(user: User) {
    return this.http.post('/api/signup/', { user: user, idToken: localStorage.getItem('id_token') });
  }

  signUpOobe(user: User) {
    return this.http.post('/api/signup/oobe', user);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('is_admin', authResult.isAdmin);
    localStorage.setItem('is_employee', authResult.isEmployee);
    localStorage.setItem('is_customer', authResult.isCustomer);
    this.getAuthenticatedUserInfo()
      .pipe(tap((res) => {
        this.userName = res.firstName + ' ' + res.lastName
      })).subscribe();
  }

  getAuthenticatedUserInfo() {
    return this.http.post<User>('/api/login/userinfo/', { idToken: localStorage.getItem('id_token') });
  }

  getCachedUserName() {
    return this.userName;
  }

  logOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("is_employee");
    localStorage.removeItem("is_customer");
    this.userName = '';
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpirationTimestamp());
  }

  isAdmin(): boolean {
    return localStorage.getItem('is_admin').valueOf() == "true";
  }

  isEmployee() {
    return localStorage.getItem('is_employee');
  }

  isCustomer() {
    return localStorage.getItem('is_customer');
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isOobe() {
    return this.http.get('/api/oobe/');
  }

  getExpirationTimestamp() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}