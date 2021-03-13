import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/pages/home/home.component'
import { InventoryComponent } from './components/pages/inventory/inventory.component'
import { ItemViewComponent } from './components/pages/item/item-view/item-view.component';
import { LoginComponent } from './components/pages/login/login.component';
import { OobeComponent } from './components/pages/oobe/oobe.component';
import { ScanComponent } from './components/pages/scan/scan.component'
import { SignupComponent } from './components/pages/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'oobe', component: OobeComponent },
  { path: '', component: HomePageComponent},
  { path: 'inventory', component: InventoryComponent, data: { routeIndex: 0 } },
  { path: 'item/view', component: ItemViewComponent, data: { routeIndex: 1 } },
  { path: 'scan', component: ScanComponent, data: { routeIndex: 2 } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
