import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'promotionDate'
})
export class PromotionDatePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';
    
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
    
        const [year, month, day] = value.split('-');
        const monthName = months[parseInt(month, 10) - 1];
        return `${monthName} ${parseInt(day, 10)}, ${year}`;
    }
}
