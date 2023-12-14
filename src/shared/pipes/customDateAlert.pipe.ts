import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateAlert'
})
export class CustomDateAlert implements PipeTransform {
  transform(valor: any): any {
    return convertirFormatoHora(valor);
  }
}
function convertirFormatoHora(cadenaHora: string) {
  // Obtener la parte de la hora de la cadena (por ejemplo, '09:00:00' -> '09:00')
  const horaFormateada = cadenaHora.substring(0, 5);

  // Parsear la cadena de hora a un objeto Date para manejar el formato
  const fecha = new Date(`2000-01-01T${horaFormateada}:00`);

  // Obtener la hora en formato de 12 horas (AM/PM)
  const hora12Formato = fecha.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return hora12Formato;
}