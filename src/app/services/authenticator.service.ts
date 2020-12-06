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
    return this.http.post('/api/login', { email: email, password: password })
      .pipe(tap(res => this.setSession(res)), shareReplay());
  }

  signUp(user: User) {
    return this.http.post('/api/signup', { firstName: user.firstName, lastName: user.lastName, email: user.email, hash: user.hash });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.getAuthenticatedUserInfo()
      .pipe(tap((res) => {
        this.userName = res.firstName + ' ' + res.lastName
      })).subscribe();
  }

  getAuthenticatedUserInfo() {
    return this.http.post<User>('/api/login/userinfo', { idToken: localStorage.getItem('id_token') });
  }

  getCachedUserName() {
    return this.userName;
  }

  logOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userName = '';
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpirationTimestamp());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpirationTimestamp() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
