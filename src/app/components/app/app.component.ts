import { Component, HostListener, OnInit } from '@angular/core';
import { transition, trigger, query, style, animate, group } from '@angular/animations'
import { ActivatedRoute } from '@angular/router';
import { SitemapService } from '../../services/sitemap.service'
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [

      transition(':decrement', [
        query(':enter, :leave', style({ width: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))], {
            optional: true,
          }),
        ]),
      ]),

      transition(':increment', [
        query(':enter, :leave', style({ width: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))], {
            optional: true,
          }),
        ]),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private sitemapservice: SitemapService,
    public authenticator: AuthenticatorService) { }

  animationState: number;
  sitemap: any;
  innerWidth: number;
  appName: string = 'MicroWMS';

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.sitemap = this.sitemapservice.getData();
  }

  onActivate(event) {
    if (this.innerWidth > 830)
      this.animationState = this.route.firstChild.snapshot.data['routeIndex']
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 830)
      this.animationState = this.route.firstChild.snapshot.data['routeIndex']
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 830)
      this.animationState = this.route.firstChild.snapshot.data['routeIndex']
  }
}
