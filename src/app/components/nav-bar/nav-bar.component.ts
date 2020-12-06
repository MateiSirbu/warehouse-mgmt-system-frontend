import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { SitemapService } from '../../services/sitemap.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  sitemap: any;
  activeLink: string = '';
  background: ThemePalette = 'primary';
  appName: string = 'Warehouse Management System';
  authenticatedUserName: string = '';

  constructor(
    private router: Router,
    private sitemapservice: SitemapService,
    public authenticator: AuthenticatorService) {
    router.events.subscribe(_ => this.highlightActiveLink());
    this.sitemap = sitemapservice.getData();
  }

  highlightActiveLink() {
    let path = document.location.pathname.toLowerCase();
    this.activeLink = path.substring(1);
  }

  ngOnInit() {
    this.highlightActiveLink();
  }
}
