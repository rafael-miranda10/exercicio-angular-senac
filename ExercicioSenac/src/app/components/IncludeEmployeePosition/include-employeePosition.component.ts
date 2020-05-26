import { EmployeePosition } from './../../models/model/EmployeePosition';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Company } from 'src/app/models/model/Company';
import { Employee } from 'src/app/models/model/Employee';
import { EmployeePositionService } from 'src/app/services/employee-position.service';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { IncludeEmployee } from 'src/app/models/model/IncludeEmployee';


@Component({
    selector: 'app-include-employeePosition',
    templateUrl: './include-employeePosition.component.html',
})
export class IncludeEmployeePositionComponent implements OnInit {

    public formIncludeEmployee: FormGroup;
    public companys: Company[];
    public positions: EmployeePosition[];
    public employeesOfCompany: Employee[];
    public employeesSelected: IncludeEmployee[];
    public formLabel: string;
    public msgsErro: string[];
    public disableBtnAdd = false;
    public operationSuccess = false;
    public msgOperationSuccess: string = '';

    public missingCompany = false;
    public missingEmployee = false;
    public missingPosition = false;
    public operationWarning = false;
    public msgWarning: string = '';


    constructor(private companyService: CompanyService,
        private employeeService: EmployeeService,
        private employeePositionService: EmployeePositionService) {

        this.formIncludeEmployee = new FormGroup({
            idCompany: new FormControl('', []),
            idPosition: new FormControl('', []),
            idEmployee: new FormControl('', []),
        })
        this.formLabel = "Vínculo de Cargos e Funcionários";
        this.msgsErro = [];
        this.employeesSelected = [];
        this.companys = [];
        this.disableBtnAdd = false;
    }

    ngOnInit() {
        this.getAllCompanys();
    }

    searchEmployees() {
        this.getAllPositions();
        this.getEmployeesOfCompany();
    }

    addEmployeeSelected() {

        var _idEmp = this.formIncludeEmployee.get("idEmployee").value;
        var _idPos = this.formIncludeEmployee.get("idPosition").value;

        if (this.validateBeforAdd(_idPos, _idEmp)) {
            if (!this.validateIfExists(_idEmp)) {
                var _employee = this.getEspecificEmployee(_idEmp);
                var _position = this.getEspecificPosition(_idPos);
                var _employeeSelected = new IncludeEmployee(_position.id, _employee.id, _employee.name.firstName, _employee.name.lastName, _employee.document.number, _position.description);

                this.employeesSelected.push(_employeeSelected);
                this.sortEmployeesSelected();
                this.formIncludeEmployee.get("idEmployee").setValue('');
                this.formIncludeEmployee.get("idPosition").setValue('');
            }
        }



        //var _teste1 = this.employeesSelected.map(function (item) {
        //    return { "idEmployee": item.idEmployee, "idPosition": item.idPosition };
        //});

    }

    validateIfExists(_id: number) {
        var exists = false;
        this.operationWarning = false;
        var _employee = this.employeesSelected.filter(x => x.idEmployee === _id)[0];
        if (_employee) {
            this.operationWarning = true;
            this.msgWarning = 'O funcionário informado já existe na lista.';
            exists = true;
        }

        return exists;
    }

    validateBeforAdd(_idPos, _idEmp) {
        var valid = true;
        this.missingPosition = false;
        this.missingEmployee = false;
        if (_idPos === "" || _idPos === 'undefined') {
            this.missingPosition = true;
            valid = false;
        }
        if (_idEmp === "" || _idEmp === 'undefined') {
            this.missingEmployee = true;
            valid = false;
        }
        return valid;
    }

    getEspecificEmployee(_id: number) {
        return this.employeesOfCompany.filter(x => x.id === _id)[0];
    }

    getEspecificPosition(_id: number) {
        return this.positions.filter(x => x.id === _id)[0];
    }

    deleteSelected(index: number) {
        if (confirm("Deseja realmente excluir este funcionário?")) {
            this.employeesSelected.splice(index, 1);
            this.sortEmployeesSelected();
        }
    }

    sortEmployeesSelected() {
        this.employeesSelected.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    }


    private getEmployeesOfCompany() {
        var idCompanySelected = this.formIncludeEmployee.get("idCompany").value;
        this.employeeService
            .GetAllEmployeeWithoutPosition(idCompanySelected)
            .subscribe(
                _employeesWithoutPositions => {
                    this.employeesOfCompany = _employeesWithoutPositions;
                    this.employeesOfCompany.sort((a, b) => (a.name.firstName > b.name.firstName) ? 1 : -1);
                    if (this.positions.length > 0 && this.employeesOfCompany.length > 0) {
                        this.disableBtnAdd = true;
                    }
                },
                _error => {
                    this.msgsErro = _error.error.errors.mensagens;
                }
            );
    }
    private getAllPositions() {
        this.employeePositionService
            .getAllEmployeePositions()
            .subscribe(
                _positions => {
                    this.positions = _positions;
                    this.positions.sort((a, b) => (a.description > b.description) ? 1 : -1);
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