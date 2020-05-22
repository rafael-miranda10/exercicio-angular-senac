import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/navegacao/menu/menu.component';
import { HomeComponent } from './components/navegacao/home/home.component';
import { FooterComponent } from './components/navegacao/footer/footer.component';
import { SobreComponent } from './components/institucional/sobre/sobre.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyComponent } from './components/Company/company.component';
import { EmployeePositionComponent } from './components/EmployeePosition/employee-position.component';

import { rootRouterConfig } from './app.routes';
import { EmployeeService } from './services/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    SobreComponent,
    EmployeeComponent,
    CompanyComponent,
    EmployeePositionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    [RouterModule.forRoot(rootRouterConfig,{ useHash:false})]
  ],
  providers: [
    EmployeeService,
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }