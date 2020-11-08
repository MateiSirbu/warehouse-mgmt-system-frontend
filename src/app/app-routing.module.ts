import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { InventoryComponent } from './pages/inventory/inventory.component'
import { ScanComponent } from './pages/scan/scan.component'

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { routeIndex: 0 } },
  { path: 'inventory', component: InventoryComponent, data: { routeIndex: 1 } },
  { path: 'scan', component: ScanComponent, data: { routeIndex: 2 } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
