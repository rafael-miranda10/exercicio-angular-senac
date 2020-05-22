import { Document } from '../ValueObjects/Document';
import { Name } from '../ValueObjects/Name';
import { Email } from '../ValueObjects/Email';
import { Address } from '../ValueObjects/Address';

export class Employee {
    id: number | null;
    registerCode: string;
    address: Address = new Address();
    email: Email = new Email();
    name: Name = new Name();
    document: Document = new Document();
}