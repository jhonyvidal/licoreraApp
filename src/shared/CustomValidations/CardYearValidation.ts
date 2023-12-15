import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CardYearValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
        const yearInput = control.value.substr(control.value.length - 4);

        if (yearInput != "") {

            const currentYear = new Date().getFullYear();
    
            const isValid = Number(yearInput) >= currentYear;
            
            return isValid ? null : { dateNotInPast: true };
        }
        
        return null;
        
    };
}
  