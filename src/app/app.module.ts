import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { HomePageComponent } from './components/pages/home/home.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ScanComponent } from './components/pages/scan/scan.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { AuthInterceptor } from './services/auth-interceptor.service';
import { ItemComponent } from './components/pages/item/item.component';
import { OobeComponent } from './components/pages/oobe/oobe.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddCompanyComponent } from './components/modals/add-company/add-company.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCompanyComponent } from './components/modals/edit-company/edit-company.component';
import { ResetPasswordComponent } from './components/modals/reset-password/reset-password.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddItemComponent } from './components/modals/add-item/add-item.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EditItemComponent } from './components/modals/edit-item/edit-item.component';
import { EditStockOHComponent } from './components/modals/edit-stock-oh/edit-stock-oh.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    InventoryComponent,
    ScanComponent,
    LoginComponent,
    SignupComponent,
    ItemComponent,
    OobeComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ResetPasswordComponent,
    AddItemComponent,
    EditItemComponent,
    EditStockOHComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    ZXingScannerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
