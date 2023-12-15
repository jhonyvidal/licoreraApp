import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class customCurrency implements PipeTransform {
  transform(valor: number, decena?: string, currency?:string ): any {;

    if(valor !== undefined && valor !== null){
      if( typeof(valor) === 'string'){
        valor = parseInt(valor);
      }
      const formattedPrice = valor.toLocaleString();
      return currency + formattedPrice.replace(',', decena || '.');
    }
  }
}
