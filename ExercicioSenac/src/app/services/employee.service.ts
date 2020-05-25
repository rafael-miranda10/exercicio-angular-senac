import { Employee } from './../models/model/Employee';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';



@Injectable({
    providedIn: 'root'
})

export class EmployeeService {

    private api: string = environment.api;

    constructor(private http: HttpClient) { }

    getAllEmployees(): Observable<Employee[]> {
        const url = `${this.api}Employee/GetAll`
        return this.http.get<Employee[]>(url);
    }

    GetAllEmployeeWithoutCompany(): Observable<Employee[]> {
        const url = `${this.api}Employee/GetEmployees-Without-Company`
        return this.http.get<Employee[]>(url);
    }

    GetAllEmployeeWithoutPosition(companyId: number): Observable<Employee[]> {
        const url = `${this.api}Employee/GetEmployees-Without-Position/${companyId}`
        return this.http.get<Employee[]>(url);
    }

    getAllByDocument(document: string): Observable<Employee> {
        const url = `${this.api}Employee/GetByDocument/${document}`
        return this.http.get<Employee>(url);
    }

    getAllById(employeeId: number): Observable<Employee> {
        const url = `${this.api}Employee/GetByDocument/${employeeId}`
        return this.http.get<Employee>(url);
    }

    createEmployee(employee: Employee): Observable<Employee>{
        const url = `${this.api}Employee/Create`
        return this.http.post<Employee>(url, employee);
    }

    updateEmployee(employee: Employee): Observable<any>{
        const url = `${this.api}Employee/Update`
        return this.http.put(url, employee);
    }

    deleteEmployee(employeeId: number): Observable<any>{
        const url = `${this.api}Employee/Remove?id=${employeeId}`
        return this.http.delete(url);
    }
}