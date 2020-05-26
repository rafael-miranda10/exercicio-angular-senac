export class IncludeEmployee {

  constructor(_idPosition: number, _idEmployee: number, _firstName: string,
    _lastName: string, _document: string, _description: string) {
    this.idPosition = _idPosition;
    this.idEmployee = _idEmployee;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.document = _document;
    this.description = _description;
  }
  idPosition: number;
  idEmployee: number;
  firstName: string;
  lastName: string;
  document: string;
  description: string;
}