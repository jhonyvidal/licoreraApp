import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CardYearValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = control.value;
        
        console.log('control.value', selectedDate);
        

        if (!selectedDate) {
            // Si la fecha no está presente, no aplicamos la validación
            return null;
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(0, 0, 0, 0);

        // Comparamos las fechas
        const isValid = selectedDateTime >= currentDate;

        // Si la validación falla, devolvemos un objeto con la clave 'dateNotInPast' y el valor true
        return isValid ? null : { dateNotInPast: true };
    };
}
  