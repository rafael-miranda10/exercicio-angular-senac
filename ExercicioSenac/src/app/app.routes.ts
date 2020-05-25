import { Component } from '@angular/core';
import { HomeComponent } from  './components/navegacao/home/home.component'; 
import { Routes } from '@angular/router';
import { SobreComponent } from './components/institucional/sobre/sobre.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyComponent } from './components/Company/company.component';
import { EmployeePositionComponent } from './components/EmployeePosition/employee-position.component';
import { RegisterEmployeeComponent } from './components/RegisterEmployee/register-employee.component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'funcionario', component: EmployeeComponent },
    { path: 'empresa', component: CompanyComponent },
    { path: 'cargo', component: EmployeePositionComponent },
    { path: 'registro-funcionario', component: RegisterEmployeeComponent },
];