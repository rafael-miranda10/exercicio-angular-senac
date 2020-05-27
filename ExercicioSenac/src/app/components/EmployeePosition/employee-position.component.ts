import { EmployeePositionService } from './../../services/employee-position.service';
import { EmployeePosition } from './../../models/model/EmployeePosition';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-position',
  templateUrl: './employee-position.component.html',
})
export class EmployeePositionComponent implements OnInit {

  public employeePositions: EmployeePosition[];
  public employeePosition: EmployeePosition;
  public formLabel: string;
  public isEditMode = false;
  public formEmployeePosition: FormGroup
  public msgsErro: string[];
  public submitted = false;
  public operationSuccess = false;
  public msgOperationSuccess: string = '';

  constructor(private employeePositionService: EmployeePositionService) {
    this.formEmployeePosition = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      salary: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]),
      referenceNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]),
      id: new FormControl(''),
    })

    this.formLabel = "Cadastro de Cargo";
    this.employeePosition = new EmployeePosition();
    this.msgsErro = [];
  }

  ngOnInit() {
    this.operationSuccess = false;
    this.msgOperationSuccess = '';
    this.getAllEmployeePositions();
  }

  isFormValid() {
    var formValid = false;
    var controls = this.formEmployeePosition.controls;
    if (controls.description.valid && controls.salary.valid && controls.referenceNumber.valid) {
      formValid = true;
    }
    return formValid;
  }

  cancel() {
    this.submitted = false;
    this.formEmployeePosition.clearValidators();
    this.formLabel = "Cadastro de Cargo";
    this.isEditMode = false;
    this.employeePosition = new EmployeePosition();
    this.steForm(this.employeePosition);
    this.msgsErro = [];
    this.getTopPage();
    this.operationSuccess = false;
  }

  steForm(_employeePostion: EmployeePosition) {
    this.formEmployeePosition.get("description").setValue(_employeePostion.description);
    this.formEmployeePosition.get("salary").setValue(_employeePostion.salary);
    this.formEmployeePosition.get("referenceNumber").setValue(_employeePostion.referenceNumber);
    this.formEmployeePosition.get("id").setValue(_employeePostion.id);
  }

  getTopPage() {
    window.scroll(0, 0);
  }

  private getAllEmployeePositions() {
    this.employeePositionService
      .getAllEmployeePositions()
      .subscribe(
        _employeesPositions => {
          this.employeePositions = _employeesPositions;
        },
        _error => {
          this.msgsErro = _error.error.errors.mensagens;
          this.getTopPage();
        }
      );
  }

  delete(_employeePositionId: number, index: number) {
    this.operationSuccess = false;
    if (confirm("Deseja realmente excluir este cargo?")) {
      this.employeePositionService
        .deleteEmployee(_employeePositionId)
        .subscribe(
          _employeePosition => {
            this.employeePosition = _employeePosition;
            this.employeePositions.splice(index, 1);
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }
  }

  edit(_employeePosition: EmployeePosition) {
    this.formLabel = "Edição de Cargo";
    this.isEditMode = true;
    this.employeePosition = _employeePosition;
    this.steForm(this.employeePosition);
    this.getTopPage();
    this.operationSuccess = false;
    this.msgOperationSuccess = '';
  }

  onSubmit() {
    this.submitted = true;
    this.operationSuccess = false;
    this.msgOperationSuccess = '';


    if (!this.isFormValid()) {
      return;
    }

    this.msgsErro = [];
    this.employeePosition = this.formEmployeePosition.value;

    if (this.isEditMode) {
      this.employeePositionService
        .updateEmployee(this.employeePosition)
        .subscribe(
          _employeePosition => {
            this.employeePosition = _employeePosition;
            this.employeePositions = this.employeePositions.filter(x => x.id !== this.employeePosition.id);
            this.employeePositions.push(this.employeePosition);
            this.formEmployeePosition.reset();
            this.submitted = false;
            this.employeePositions.sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.isEditMode = false;
            this.operationSuccess = true;
            this.msgOperationSuccess = 'cargo editado com sucesso.';
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );

    } else {
      this.employeePositionService
        .createEmployee(this.employeePosition)
        .subscribe(
          _employeePosition => {
            this.employeePosition = _employeePosition;
            this.employeePositions.push(this.employeePosition);
            this.formEmployeePosition.reset();
            this.submitted = false;
            this.operationSuccess = true;
            this.msgOperationSuccess = 'Cargo cadastrado com sucesso.';
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }

  }

}