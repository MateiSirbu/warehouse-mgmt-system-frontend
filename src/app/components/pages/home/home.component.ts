import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../../../services/authenticator.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    public authenticator: AuthenticatorService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  navigateToLogin() {
    this.router.navigate(["/login"])
  }

  navigateToSignUp() {
    this.router.navigate(["/signup"])
  }

}
