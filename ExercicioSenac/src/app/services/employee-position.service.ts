import { EmployeePosition } from './../models/model/EmployeePosition';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/model/Employee';


@Injectable({
    providedIn: 'root'
})

export class EmployeePositionService {

    private api: string = environment.api;

    constructor(private http: HttpClient) { }

    getAllEmployeePositions(): Observable<EmployeePosition[]> {
        const url = `${this.api}EmployeePosition/GetAll`;
        return this.http.get<EmployeePosition[]>(url);
    }

    getAllById(employeePositionId: number): Observable<EmployeePosition> {
        const url = `${this.api}EmployeePosition/GetByDocument/${employeePositionId}`
        return this.http.get<EmployeePosition>(url);
    }

    createEmployee(employeePosition: EmployeePosition): Observable<EmployeePosition> {
        const url = `${this.api}EmployeePosition/Create`
        return this.http.post<EmployeePosition>(url, employeePosition);
    }

    updateEmployee(employeePosition: EmployeePosition): Observable<any> {
        const url = `${this.api}EmployeePosition/Update`
        return this.http.put(url, employeePosition);
    }

    IncludeEmployeePosition(listEmployee: Employee[]): Observable<any> {
        const url = `${this.api}EmployeePosition/Include-Employee-Position`
        return this.http.post(url, listEmployee);
    }

    deleteEmployee(employeePositionId: number): Observable<any> {
        const url = `${this.api}EmployeePosition/Remove?id=${employeePositionId}`
        return this.http.delete(url);
    }

}