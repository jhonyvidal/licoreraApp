import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateOrders'
})
export class CustomDateOrders implements PipeTransform {
  transform(valor: any): any {
    return convertirFormatoFecha(valor);
  }
}
function convertirFormatoFecha(cadenaFecha:string) {
  // Parsear la cadena de fecha
  const fecha = new Date(cadenaFecha);

  // Días de la semana y meses en español
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Obtener información de la fecha
  const diaSemana = diasSemana[fecha.getUTCDay()];
  const dia = fecha.getUTCDate();
  const mes = meses[fecha.getUTCMonth()];
  const año = fecha.getUTCFullYear();
  let horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();
  const ampm = horas >= 12 ? 'pm' : 'am';

  // Ajustar el formato de las horas (formato de 12 horas)
  horas = horas % 12 || 12;

  // Formatear la fecha en el nuevo formato
  const fechaFormateada = `${diaSemana}, ${dia} ${mes} ${año}, ${horas}:${minutos} ${ampm}`;

  return fechaFormateada;
}