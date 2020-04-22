import { Store } from '@ngrx/store';
import { FormControl, NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { timer, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

// export const dependentExistsAsyncValidator =
// (clientOnbaordingService: ClientOnbaordingService, time: number = 500) => {
//   return (input: FormControl) => {
//     return timer(time).pipe(
//       switchMap(() => clientOnbaordingService.checkDependentExists(input.value)),
//       map(res => res ? {dependentExists: true} : null)
//     );
//   };
// };

import { of as observableOf } from 'rxjs';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appCustomAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: DependentExistsAsyncValidator, multi:
true}]
})
class DependentExistsAsyncValidator implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    return observableOf({dependentExists: true});
  }
}
// validateNameViaServer({value}: AbstractControl): Observable<ValidationErrors | null> {
//     this.service.isNameExists(value)
//     .pipe(debounceTime(500), map((nameExists: boolean) => {
//         if (nameExists) {
//             return {
//                 isExists: true
//             };
//         }
//         return null;
//     });
// }



export const IDNumberValidatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors| null => {
        const integerVal = control.value.toString();
        const isIDNumberLengthValid = integerVal.length === 13;
        const isIDNumberMonthValid = integerVal.length >= 4 ? +integerVal.substring(2, 4) <= 12 : true;
        // console.log('month', integerVal.substring(2, 4))
        const isIDDayValid = integerVal.length >= 6 ? +integerVal.substring(4, 6) <= 31 : true;
        // console.log('day',integerVal.substring(4, 6));
        let date = new Date((new Date()).getFullYear(), +integerVal.substring(2, 4), 0);
        // console.log('day of month',date.getDate());
        const isDayMonthCombinationValid = integerVal.length >= 6 ? +integerVal.substring(4, 6) <= date.getDate() : true;
        const isIDCitizenshipIndicatorValid = integerVal.length >= 11 ? (+integerVal.substring(10, 11) === 1 || +integerVal.substring(10, 11) === 0) : true;
        // console.log('citizenship indicator', integerVal.substring(9, 10));
        const ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
        const isFormatValid = ex.test(integerVal);

        const isNumber = !isNaN(parseFloat(integerVal)) && isFinite(integerVal);
        // console.log('is integer', isNumber);
        // console.log('value', integerVal);
        if (!isNumber) {
          return { invalidDataType: true};
        }

        if (!isIDNumberLengthValid) {
          return { invalidIdNumberLength: true };
        }
        if (!isIDNumberMonthValid) {
          return { invalidIdNumberMonth: true };
        }

        if (!isIDDayValid) {
          return { invalidIdNumberDay: true };
        }

        if (!isDayMonthCombinationValid) {
          return { invalidDayMonthCombination: true};
        }

        if (!isIDCitizenshipIndicatorValid) {
          return { invalidCitizenshipIndicator: true};
        }

        if (!isFormatValid) {
          return { invalidFormat: true};
        }
        return null;
  };
