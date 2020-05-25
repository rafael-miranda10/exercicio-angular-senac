import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/model/Company';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
})
export class RegisterEmployeeComponent implements OnInit {

  public formRegisterEmployee: FormGroup;
  public companys: Company[];
  public formLabel: string;
  public msgsErro: string[];
  public submitted = false;
  public operationSuccess = false;
  public msgOperationSuccess: string = '';

  constructor(private companyService: CompanyService) {
    this.formRegisterEmployee = new FormGroup({


    })
    this.formLabel = "Registro de Funcionários na Empresa";
    this.msgsErro = [];

  }

  ngOnInit() {
    this.getAllCompanys();
  }

  private getAllCompanys() {
    this.companyService.getAllCompanys().subscribe(
      _companys => {
        this.companys = _companys;
      },
      _error => {
        this.msgsErro = _error.error.errors.mensagens;
      }
    );
  }



}