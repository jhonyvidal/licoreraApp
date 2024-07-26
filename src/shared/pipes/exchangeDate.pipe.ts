import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exchangeDate'
})
export class ExchangeDatePipe implements PipeTransform {

  transform(cadenaFecha: string): string {
    // Parsear la cadena de fecha
    const fecha = new Date(cadenaFecha);

    // Días de la semana y meses en español
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    // Obtener información de la fecha
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    // Formatear la fecha en el nuevo formato
    const fechaFormateada = `${diaSemana}, ${dia} ${mes} ${año}`;

    return fechaFormateada;
  }

}