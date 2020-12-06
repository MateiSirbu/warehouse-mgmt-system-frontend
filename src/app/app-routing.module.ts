import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/pages/home/home.component'
import { InventoryComponent } from './components/pages/inventory/inventory.component'
import { LoginComponent } from './components/pages/login/login.component';
import { ScanComponent } from './components/pages/scan/scan.component'
import { SignupComponent } from './components/pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { routeIndex: 0 } },
  { path: 'inventory', component: InventoryComponent, data: { routeIndex: 1 } },
  { path: 'scan', component: ScanComponent, data: { routeIndex: 2 } },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
