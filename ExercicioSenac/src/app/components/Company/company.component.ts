import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from './../../models/model/Company';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {

  public companys: Company[];
  public company: Company;
  public formLabel: string;
  public isEditMode = false;
  public formCompany: FormGroup;
  public msgsErro: string[];
  public submitted = false;
  public operationSuccess = false;
  public msgOperationSuccess: string = '';
  public states: any[];

  constructor(private companyService: CompanyService) {
    this.formCompany = new FormGroup({
      address: new FormGroup({
        street: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$")]),
        neighborhood: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      }),
      document: new FormGroup({
        number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[1-9][0-9]*$"), Validators.maxLength(14)]),
      }),
      email: new FormGroup({
        address: new FormControl('', [Validators.required, Validators.email]),
      }),
      companyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      fantasyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      id: new FormControl(''),
    })
    this.formLabel = "Cadastro de Empresa";
    this.company = new Company();
    this.msgsErro = [];
    this.states = [];
  }

  ngOnInit() {
    this.getAllCompanys();
    this.initStates();
    this.operationSuccess = false;
    this.msgOperationSuccess = '';
  }

  initStates(){
    this.states = [
      {"id":"SP","name":"São Paulo"},
      {"id":"RJ","name":"Rio de Janeiro"},
      {"id":"PR","name":"Paraná"},
      {"id":"MG","name":"Minas Gerais"},
      {"id":"MT","name":"Mato Grosso"},
     ];
 }

  onSubmit() {
    this.submitted = true;
    this.operationSuccess = false;
    this.msgOperationSuccess = '';


    if (!this.isFormValid()) {
      return;
    }

    this.msgsErro = [];
    this.company = this.formCompany.value;
    this.company.document.type = 2

    if (this.isEditMode) {
      this.companyService
        .updateEmployee(this.company)
        .subscribe(
          _company => {
            this.company = _company;
            this.companys = this.companys.filter(x => x.id !== this.company.id);
            this.companys.push(this.company);
            this.formCompany.reset();
            this.submitted = false;
            this.companys.sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.isEditMode = false;
            this.operationSuccess = true;
            this.msgOperationSuccess = 'Empresa editada com sucesso.';
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );

    } else {
      this.companyService
        .createEmployee(this.company)
        .subscribe(
          _company => {
            this.company = _company;
            this.companys.push(this.company);
            this.formCompany.reset();
            this.submitted = false;
            this.operationSuccess = true;
            this.msgOperationSuccess = 'Empresa cadastrada com sucesso.';
          },
          _error => {
            this.msgsErro = _error.error.errors.mensagens;
            this.getTopPage();
          }
        );
    }

  }

  isFormValid() {
    var formValid = false;
    var controls = this.formCompany.controls;
    if (controls.address.valid && controls.email.valid &&
      controls.document.valid && controls.companyName.valid && controls.fantasyName.valid) {
      formValid = true;
    }
    return formValid;
  }

  private getAllCompanys() {
    this.companyService.getAllCompanys().subscribe(
      _companys => {
        this.companys = _companys;
      },
      _error => {
        this.msgsErro = _error.error.errors.mensagens;
        this.getTopPage();
      }
    );
  }

  cancel() {
    this.formLabel = "Cadastro de Empresa";
    this.isEditMode = false;
    this.company = new Company();
    this.steForm(this.company);
    this.msgsErro = [];
    this.getTopPage();
    this.operationSuccess = false;
  }

  steForm(_company: Company) {
    this.formCompany.get("address").get("street").setValue(_company.address.street);
    this.formCompany.get("address").get("number").setValue(_company.address.number);
    this.formCompany.get("address").get("neighborhood").setValue(_company.address.neighborhood);
    this.formCompany.get("address").get("city").setValue(_company.address.city);
    this.formCompany.get("address").get("state").setValue(_company.address.state);
    this.formCompany.get("document").get("number").setValue(_company.document.number);
    this.formCompany.get("email").get("address").setValue(_company.email.address);
    this.formCompany.get("companyName").setValue(_company.companyName);
    this.formCompany.get("fantasyName").setValue(_company.fantasyName);
    this.formCompany.get("id").setValue(_company.id);
  }

  edit(_company: Company) {
    this.formLabel = "Edição de Empresa";
    this.msgOperationSuccess = '';
    this.isEditMode = true;
    this.company = _company;
    this.steForm(this.company);
    this.getTopPage();
  }

  delete(_companyId: number, index: number) {
    this.operationSuccess = false;
    if (confirm("Deseja realmente excluir esta empresa?")) {
      this.companyService
        .deleteEmployee(_companyId)
        .subscribe(
          _employee => {
            this.company = _employee;
            this.companys.splice(index, 1);
          },
          _error => console.log(_error)
        );
    }
  }

  getTopPage() {
    window.scroll(0, 0);
  }


}