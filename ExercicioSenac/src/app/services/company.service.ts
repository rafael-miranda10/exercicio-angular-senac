import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/model/Company';
import { RegisterEmployee } from '../models/model/RegisterEmployee';

@Injectable({
    providedIn: 'root'
})

export class CompanyService {

    private api: string = environment.api;

    constructor(private http: HttpClient) { }

    getAllCompanys(): Observable<Company[]> {
        const url = `${this.api}Company/GetAll`;
        return this.http.get<Company[]>(url);
    }

    getAllByDocument(document: string): Observable<Company> {
        const url = `${this.api}Company/GetByDocument/${document}`
        return this.http.get<Company>(url);
    }

    getAllById(companyId: number): Observable<Company> {
        const url = `${this.api}Company/GetByDocument/${companyId}`
        return this.http.get<Company>(url);
    }

    createEmployee(company: Company): Observable<Company> {
        const url = `${this.api}Company/Create`
        return this.http.post<Company>(url, company);
    }

    updateEmployee(company: Company): Observable<any> {
        const url = `${this.api}Company/Update`
        return this.http.put(url, company);
    }

    deleteEmployee(companyId: number): Observable<any> {
        const url = `${this.api}Company/Remove?id=${companyId}`
        return this.http.delete(url);
    }

    registerEmployees(registerEmployee: RegisterEmployee): Observable<any> {
        const url = `${this.api}Company/Register-Employee-Company`
        return this.http.post(url, registerEmployee);
    }

}
