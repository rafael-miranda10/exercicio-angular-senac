import { Component } from '@angular/core';
import { HomeComponent } from  './components/navegacao/home/home.component'; 
import { Routes } from '@angular/router';
import { SobreComponent } from './components/institucional/sobre/sobre.component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sobre', component: SobreComponent }
];