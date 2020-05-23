import { Employee } from './../../models/model/Employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {


  public employees: Employee[];
  public employee: Employee;
  public formLabel: string;
  public isEditMode = false;
  public formEmployee: FormGroup
  public msgsErro: string[];
  public submitted = false;

  constructor(private employeeService: EmployeeService) {
    this.formEmployee = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      }),
      address: new FormGroup({
        street: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]),
        neighborhood: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      }),
      document: new FormGroup({
        number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$"), Validators.maxLength(11)]),
      }),
      email: new FormGroup({
        address: new FormControl('', [Validators.required]),
      }),
      registerCode: new FormControl(''),
      id: new FormControl(''),
    })

    this.formLabel = "Cadastrar Funcionário";
    this.employee = new Employee();
    this.msgsErro = [];
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  isFormValid() {
    var formValid = false;
    var controls = this.formEmployee.controls;
    if (controls.name.valid && controls.address.valid && controls.email.valid && controls.document.valid) {
      formValid = true;
    }
    return formValid;
  }
  onSubmit() {
    this.submitted = true;

    if (!this.isFormValid()) {
      return;
    }

    this.msgsErro = [];
    this.employee = this.formEmployee.value;
    this.employee.document.type = 1

    if (this.isEditMode) {
      this.employeeService
        .updateEmployee(this.employee)
        .subscribe(
          _employee => {
            this.employee = _employee;
            this.employees = this.employees.filter(x => x.id !== this.employee.id);
            this.employees.push(this.employee);
            this.formEmployee.reset();
            this.submitted = false;
            this.employees.sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.isEditMode = false;
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );

    } else {
      this.employeeService
        .createEmployee(this.employee)
        .subscribe(
          _employee => {
            this.employee = _employee;
            this.employees.push(this.employee);
            this.formEmployee.reset();
            this.submitted = false;
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }

  }

  cancel() {
    this.formLabel = "Cadastrar Funcionário";
    this.isEditMode = false;
    this.employee = new Employee();
    this.steForm(this.employee);
    this.msgsErro = [];
    this.getTopPage();
  }

  steForm(_employee: Employee) {
    this.formEmployee.get("name").get("firstName").setValue(_employee.name.firstName);
    this.formEmployee.get("name").get("lastName").setValue(_employee.name.lastName);
    this.formEmployee.get("address").get("street").setValue(_employee.address.street);
    this.formEmployee.get("address").get("number").setValue(_employee.address.number);
    this.formEmployee.get("address").get("neighborhood").setValue(_employee.address.neighborhood);
    this.formEmployee.get("address").get("city").setValue(_employee.address.city);
    this.formEmployee.get("address").get("state").setValue(_employee.address.state);
    this.formEmployee.get("document").get("number").setValue(_employee.document.number);
    this.formEmployee.get("email").get("address").setValue(_employee.email.address);
    this.formEmployee.get("registerCode").setValue(_employee.registerCode);
    this.formEmployee.get("id").setValue(_employee.id);
    this.formEmployee
  }

  edit(_employee: Employee) {
    this.formLabel = "Editar Funcionário";
    this.isEditMode = true;
    this.employee = _employee;
    this.steForm(this.employee);
    this.getTopPage();
  }

  delete(_employeeId: number, index: number) {
    if (confirm("Deseja realmente excluir este funcionário?")) {
      this.employeeService
        .deleteEmployee(_employeeId)
        .subscribe(
          _employee => {
            this.employee = _employee;
            this.employees.splice(index, 1);
          },
          _error => console.log(_error)
        );
    }
  }

  private getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .subscribe(
        _employees => {
          this.employees = _employees;
        },
        _error => console.log(_error)
      );
  }

  getTopPage() {
    window.scroll(0, 0);
  }

}