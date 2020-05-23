import { Document } from '../ValueObjects/Document';
import { Name } from '../ValueObjects/Name';
import { Email } from '../ValueObjects/Email';
import { Address } from '../ValueObjects/Address';

export class Employee {
    id: number | null;
    registerCode: string;
    address: Address;
    email: Email;
    name: Name;
    document: Document;
}