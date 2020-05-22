import { Employee } from './../../models/model/Employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder) {
    this.formEmployee = this.formBuilder.group({
      "firstName": ["", [Validators.pattern('[a-zA-Z][a-zA-Z ]+$'), Validators.required]],
      "lastName": ["", [Validators.pattern('[a-zA-Z][a-zA-Z ]+$'), Validators.required]],
      "street": ["", [Validators.pattern('[a-zA-Z][a-zA-Z ]+$'), Validators.required]],
      "number": ["", [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]],
      "neighborhood": ["", [Validators.pattern('[a-zA-Z][a-zA-Z ]+$'), Validators.required]],
      "city": ["", [Validators.pattern('[a-zA-Z][a-zA-Z ]+$'), Validators.required]],
      "state": ["", [Validators.pattern('[a-zA-Z][a-zA-Z ]+$'), Validators.required]],
      "cpf": ["", [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]],
      "email": ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      "registerCode": [""],
      "id": [""],
    });

    this.formLabel = "Cadastrar Funcionário";
    this.employee = new Employee();
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  onSubmit() {
    this.employee.registerCode = this.formEmployee.controls['registerCode'].value;
    this.employee.name.firstName = this.formEmployee.controls['firstName'].value;
    this.employee.name.lastName = this.formEmployee.controls['lastName'].value;
    this.employee.address.street = this.formEmployee.controls['street'].value;
    this.employee.address.number = this.formEmployee.controls['number'].value;
    this.employee.address.neighborhood = this.formEmployee.controls['neighborhood'].value;
    this.employee.address.city = this.formEmployee.controls['city'].value;
    this.employee.address.state = this.formEmployee.controls['state'].value;
    this.employee.document.number = this.formEmployee.controls['cpf'].value;
    this.employee.document.type = 1;
    this.employee.email.address = this.formEmployee.controls['email'].value;
    this.employee.id = this.formEmployee.controls['id'].value;

    if (this.isEditMode) {
      this.employeeService
        .updateEmployee(this.employee)
        .subscribe(
          _employee => {
            this.employee = _employee;
            this.employees = this.employees.filter(x => x.id !== this.employee.id);
            this.employees.push(this.employee);
            this.formEmployee.reset();
          },
          _error => console.log(_error)
        );

    } else {
      this.employeeService
        .createEmployee(this.employee)
        .subscribe(
          _employee => {
            this.employee = _employee;
            this.employees.push(this.employee);
            this.formEmployee.reset();
          },
          _error => console.log(_error)
        );
    }

  }

  cancel() {
    this.formLabel = "Cadastrar Funcionário";
    this.isEditMode = false;
    this.employee = new Employee();
    this.steForm(this.employee);
  }

  steForm(_employee: Employee) {
    this.formEmployee.get("firstName").setValue(_employee.name.firstName);
    this.formEmployee.get("lastName").setValue(_employee.name.lastName);
    this.formEmployee.get("street").setValue(_employee.address.street);
    this.formEmployee.get("number").setValue(_employee.address.number);
    this.formEmployee.get("neighborhood").setValue(_employee.address.neighborhood);
    this.formEmployee.get("city").setValue(_employee.address.city);
    this.formEmployee.get("state").setValue(_employee.address.state);
    this.formEmployee.get("cpf").setValue(_employee.document.number);
    this.formEmployee.get("email").setValue(_employee.email.address);
    this.formEmployee.get("registerCode").setValue(_employee.registerCode);
    this.formEmployee.get("id").setValue(_employee.id);
  }

  edit(_employee: Employee) {
    this.formLabel = "Editar Funcionário";
    this.isEditMode = true;
    this.employee = _employee;
    this.steForm(this.employee);
  }

  delete(_employeeId: number, index: number) {
    if (confirm("Deseja realmente excluir este funcionário?")) {
      this.employeeService
        .deleteEmployee(_employeeId)
        .subscribe(
          _employee => {
            this.employee = _employee;
            this.employees.splice(index,1);
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



}