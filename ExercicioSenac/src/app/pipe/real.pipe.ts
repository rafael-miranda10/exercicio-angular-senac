import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'REAL'
})
export class REALPipe implements PipeTransform {
    transform(value: number, ...args: any[]): any {
        if (value => 0) {
           // var salary = "R$ "+ value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
           // return salary;

          // var numero = value.toFixed(2).split('.');
          //  numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
          //  return numero.join(',');
          return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value);
        }
        return 'error';
    }
}