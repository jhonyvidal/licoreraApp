import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class customCurrency implements PipeTransform {
  transform(valor: any, decena?: string, currency?:string ): any {
    const formattedPrice = valor.toLocaleString();
    return currency + formattedPrice.replace(',', decena || '.');
  }
}