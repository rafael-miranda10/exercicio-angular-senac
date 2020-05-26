import { Employee } from 'src/app/models/model/Employee';
import { Document } from '../ValueObjects/Document';
import { Name } from '../ValueObjects/Name';
import { Email } from '../ValueObjects/Email';
import { Address } from '../ValueObjects/Address';

export class Company {

    constructor(){
        this.id = null;
        this.address = new Address();
        this.document = new Document();
        this.email = new Email();
        this.name = new Name();
        this.companyName = '';
        this.fantasyName = '';
        this.employees = [];
    }

    id: number | null;
    companyName: string;
    fantasyName: string;
    address: Address;
    email: Email;
    name: Name;
    document: Document;
    employees : Employee[];
}