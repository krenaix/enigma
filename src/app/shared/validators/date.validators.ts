import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export function DOBValidatorFn(minAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const date = new Date(control.value);

    let today = new Date();
    const minDOB = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDay());
    let isValid = true;
    let message = '';
    // console.log(minDOB);
    if (date > today) {
      isValid = false;
      message = 'futureDate';
      // control.setErrors({ dob_FutureDate: true });
    } else if (message === '' && date > minDOB) {
      isValid = false;
      message = 'minDOB';
      // control.setErrors({ dob_MinDate: true });
    }
    return !isValid ? message === 'futureDate' ? { dob_FutureDate: true } :
      message === 'minDOB' ? { dob_MinDate: true } : null : null;
  };
}
