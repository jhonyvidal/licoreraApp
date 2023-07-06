import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipe implements PipeTransform {
  transform(valor: any, type: number): any {
    var patronNumero = /\d+/;

    // Buscar el número en la cadena utilizando el patrón de expresión regular
    var resultado = valor.match(patronNumero);

    if (resultado) {
      var numero = resultado[0];
      var posicion = resultado.index - 1;
      if(type === 1){
        return  valor.substring(0, posicion).trim();
      }
      if(type === 2){
        return  valor.substring(posicion).trim();
      }
    }
  }
}