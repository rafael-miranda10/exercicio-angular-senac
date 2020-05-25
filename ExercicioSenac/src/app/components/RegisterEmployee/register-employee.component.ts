import { Employee } from './../../models/model/Employee';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/model/Company';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
})
export class RegisterEmployeeComponent implements OnInit {

  public formRegisterEmployee: FormGroup;
  public companys: Company[];
  public employeesWithoutCompany: Employee[];
  public employeesSelected: Employee[];
  public formLabel: string;
  public msgsErro: string[];
  public submitted = false;
  public operationSuccess = false;
  public msgOperationSuccess: string = '';
  public missingCompany = false;
  public missingEmployee = false;
  public operationWarning = false;
  public msgWarning: string = '';



  constructor(private companyService: CompanyService,
    private employeeService: EmployeeService) {

    this.formRegisterEmployee = new FormGroup({
      idCompany: new FormControl('', []),
      idEmployee: new FormControl('', []),
    })
    this.formLabel = "Vínculo de Funcionários e Empresa";
    this.msgsErro = [];
    this.employeesSelected = [];

  }

  ngOnInit() {
    this.getAllCompanys();
    this.getEmployeesWithoutCompany();
  }

  bindEmployeeCompany() {
    this.missingEmployee = false;
    this.operationWarning = false;
    var idCompany = this.formRegisterEmployee.get("idCompany").value;

    if (idCompany <= 0) {
      this.missingCompany = true;
      return;
    }
    this.missingCompany = false;
    var idsEmployeeSelected: number[] = [];
    this.employeesSelected.forEach((_employee, index) => {
      idsEmployeeSelected[index] = _employee.id;
    });

    this.companyService
      .registerEmployees(idCompany, idsEmployeeSelected)
      .subscribe(
        response => {
          this.msgOperationSuccess = 'Vínculo de funcionários realizado com sucesso.'
          this.operationSuccess = true;
          this.formRegisterEmployee.get("idCompany").setValue('');
          this.formRegisterEmployee.get("idEmployee").setValue('');
          this.employeesSelected = [];
          this.operationWarning = false;
          this.msgsErro = [];
        },
        _error => {
          this.msgsErro = _error.error.errors.mensagens;
          this.getTopPage();
        });
  }

  addEmployeeSelected() {
    this.operationSuccess = false;
    var idEmployeeSelected = this.formRegisterEmployee.get("idEmployee").value;
    if(idEmployeeSelected > 0){
      var exists = this.employeesSelected.filter(x => x.id === idEmployeeSelected);
      if(exists.length >0){
        this.operationWarning = true;
        this.msgWarning = 'O funcionário informado já existe na lista.';
        return;
      }
      var _employee = this.employeesWithoutCompany.filter(x => x.id === idEmployeeSelected);
      this.employeesSelected.push(_employee[0]);
      this.employeesSelected.sort((a, b) => (a.id > b.id) ? 1 : -1);
      this.formRegisterEmployee.get("idEmployee").setValue('');
      this.missingEmployee = false;
      this.operationWarning = false;
    }
    else{
      this.missingEmployee = true;
    }


  }
  deleteSelected(index: number) {
    if (confirm("Deseja realmente excluir esta empresa?")) {
      this.employeesSelected.splice(index, 1);
      this.employeesSelected.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }
  }

  private getEmployeesWithoutCompany() {
    this.employeeService.GetAllEmployeeWithoutCompany()
      .subscribe(
        _employeesWithouCompany => {
          this.employeesWithoutCompany = _employeesWithouCompany;
        },
        _error => {
          this.msgsErro = _error.error.errors.mensagens;
        }
      );
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

  getTopPage() {
    window.scroll(0, 0);
  }

}