import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from 'src/app/models/model/Employee';
import { Company } from 'src/app/models/model/Company';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
})
export class ListingComponent implements OnInit {


    public formListing: FormGroup;
    public companys: Company[];
    public formLabel: string;
    public msgsErro: string[];
    public operationSuccess = false;
    public msgOperationSuccess: string = '';
    public missingCompany = false;
    public missingEmployee = false;
    public operationWarning = false;
    public msgWarning: string = '';
    public ListCompanyEmployees = [];

    constructor(private companyService: CompanyService) {
        this.formListing = new FormGroup({
            idCompany: new FormControl('', []),
            idEmployee: new FormControl('', []),
          })
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

    getTopPage() {
        window.scroll(0, 0);
    }
}