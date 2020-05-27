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
import { RegisterEmployeeComponent } from './components/RegisterEmployee/register-employee.component';
import { CompanyService } from './services/company.service';
import { RegisterEmployeeService } from './services/register-employee.service';
import { EmployeePositionService } from './services/employee-position.service';
import { ListingComponent } from './components/ListingCompanyEmployees/listing.component';
import { IncludeEmployeePositionComponent } from './components/IncludeEmployeePosition/include-employeePosition.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule, CurrencyMaskInputMode } from "ngx-currency";
import { NgxPaginationModule } from 'ngx-pagination'; // Módulo da dependência de paginação
import { CPFPipe } from './pipe/cpf.pipe';
import { CNPJPipe } from './pipe/cnpj.pipe';
import { REALPipe } from './pipe/real.pipe';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    SobreComponent,
    EmployeeComponent,
    CompanyComponent,
    EmployeePositionComponent,
    RegisterEmployeeComponent,
    IncludeEmployeePositionComponent,
    ListingComponent,
    CPFPipe,
    CNPJPipe,
    REALPipe,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    [NgxCurrencyModule.forRoot(customCurrencyMaskConfig)],
    [NgxMaskModule.forRoot(maskConfig)],
    [RouterModule.forRoot(rootRouterConfig,{ useHash:false})]
  ],
  providers: [
    EmployeeService,
    CompanyService,
    EmployeePositionService,
    RegisterEmployeeService,
    { provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }