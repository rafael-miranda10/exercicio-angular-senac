import { EmployeePosition } from './EmployeePosition';
import { Document } from '../ValueObjects/Document';
import { Name } from '../ValueObjects/Name';
import { Email } from '../ValueObjects/Email';
import { Address } from '../ValueObjects/Address';

export class Employee {

    constructor() {
        this.id = null;
        this.address = new Address();
        this.document = new Document();
        this.email = new Email();
        this.name = new Name();
        this.registerCode = '';
        this.EmployeePosition = new EmployeePosition();
    }
    id: number | null;
    registerCode: string;
    address: Address;
    email: Email;
    name: Name;
    document: Document;
    EmployeePosition : EmployeePosition;
}