import { Employee } from 'src/app/models/model/Employee';
export class EmployeePosition {

    constructor(){
      this.id = null;
      this.description = '';
      this.salary = null;
      this.referenceNumber = null;
      this.employees = [];
    }

    id: number | null;
    description: string;
    salary: number;
    referenceNumber: number;
    employees: Employee[];
}