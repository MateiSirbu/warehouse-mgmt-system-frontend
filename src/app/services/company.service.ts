import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../data/company.entity';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  addCompany(company: Company) {
    return this.http.post('/api/company', company);
  }

  editCompany(company: Company) {
    return this.http.put('/api/company', company);
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('/api/company');
  }

}
