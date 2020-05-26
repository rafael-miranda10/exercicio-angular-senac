export class RegisterEmployee {
    constructor(_idCompany: number,_employees: number[]) {
        this.idCompany = _idCompany;
        this.employees = _employees;
    }
    idCompany: number;
    employees: number[];
}