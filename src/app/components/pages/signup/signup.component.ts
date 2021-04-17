import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/data/user.entity';
import { AuthenticatorService } from '../../../services/authenticator.service'
import { Company } from '../../../data/company.entity'
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from '../../modals/add-company/add-company.component';
import { EditCompanyComponent } from '../../modals/edit-company/edit-company.component';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authenticator: AuthenticatorService,
    private companyService: CompanyService,
    private route: Router) { }

  companies: Company[] = []
  roles: string[] = ['Customer', 'Employee', 'Administrator']
  model = { firstName: "", lastName: "", email: "", password: "", verifyPassword: "", role: this.roles[0], company: null }

  inputEnabled = true;
  submitted = false;

  ngOnInit(): void {
    this.authenticator.isOobe()
      .pipe(tap((resp: { isOobe: boolean }) => {
        if (resp.isOobe == true) {
          this.route.navigate(['/oobe'])
          this.openSnackBar(`Welcome to WMS!`);
        }
      }))
      .subscribe();
    if (!this.authenticator.isLoggedIn() || !this.authenticator.isAdmin()) {
      this.route.navigate(['/'])
      this.openSnackBarAlert("User management requires administrative privileges.")
      return;
    }
    this.companyService.getCompanies()
      .pipe(tap((resp) => {
        this.companies = resp
        if (this.companies.length > 0)
          this.model.company = this.companies[0]
        else
          this.model.company = null;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.status}: ${error.statusText}.`);
        return EMPTY;
      }))
      .subscribe();
  }

  onSubmit() {
    this.openSnackBar('Creating account...')
    this.inputEnabled = false;
    this.model.email = this.model.email.toLowerCase();

    let newUser: User = new User()
    newUser.firstName = this.model.firstName
    newUser.lastName = this.model.lastName
    newUser.email = this.model.email
    newUser.hash = this.model.password
    newUser.role = this.model.role

    this.authenticator.signUp(newUser, this.model.company)
      .pipe(tap((resp) => {
        if (resp != null) {
          this.openSnackBar('Account created successfully.')
          this.submitted = true;
          this.inputEnabled = true;
        }
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.status}: Cannot add user. ${error.statusText}.`);
        this.inputEnabled = true;
        return EMPTY;
      }))
      .subscribe();
  }

  addCompany() {
    let newCompanyForm = this.fb.group({
      name: "",
      address: ""
    })
    const dialogRef = this.dialog.open(AddCompanyComponent, { width: '400px', maxHeight: '90vh', data: newCompanyForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.openSnackBar('Adding company...')
        let newCompany: Company = {
          name: newCompanyForm.value.name,
          address: newCompanyForm.value.address
        }
        this.companyService.addCompany(newCompany)
          .pipe(tap((resp) => {
            this.openSnackBar('Done.')
            this.companyService.getCompanies()
              .pipe(tap((resp) => {
                this.companies = resp
                if (this.companies.length > 0)
                  this.model.company = this.companies[0]
                else
                  this.model.company = null;
              }))
              .subscribe();
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBarAlert(`${error.status}: Cannot add company. ${error.statusText}.`);
            return EMPTY;
          }))
          .subscribe();
      }
    })
  }

  editCompany() {
    let editedCompanyForm = this.fb.group({
      id: new String(this.model.company.id),
      name: new String(this.model.company.name),
      address: new String(this.model.company.address)
    })
    const dialogRef = this.dialog.open(EditCompanyComponent, { width: '400px', maxHeight: '90vh', data: editedCompanyForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let editedCompany: Company = {
          id: editedCompanyForm.value.id,
          name: editedCompanyForm.value.name,
          address: editedCompanyForm.value.address
        }
        this.companyService.editCompany(editedCompany)
          .pipe(tap((resp) => {
            this.openSnackBar('Done.')
            this.companyService.getCompanies()
              .pipe(tap((resp) => {
                this.companies = resp
                if (this.companies.length > 0)
                  this.model.company = this.companies[0]
                else
                  this.model.company = null;
              }))
              .subscribe();
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBarAlert(`${error.status}: Cannot edit company. ${error.statusText}.`);
            return EMPTY;
          }))
          .subscribe();
      }
    })
  }

  navigateToHomepage() {
    this.route.navigate(['/']);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 10000,
      panelClass: ['my-snack-bar-alert']
    });
  }

}
