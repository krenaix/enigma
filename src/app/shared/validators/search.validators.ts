import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export const MinimumSearchValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let isValid = false;
    if (control.get('fcAgentNameSurnamNumber') && control.get('fcAgentNameSurnamNumber').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcMemberNameSurname') && control.get('fcMemberNameSurname').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcMemberId') && control.get('fcMemberId').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcPolicyNumber') && control.get('fcPolicyNumber').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcAgentId') && control.get('fcAgentId').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcProduct') && control.get('fcProduct').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcFromDate') && control.get('fcFromDate').value) {
        isValid = true;
    }
    if (!isValid && control.get('fcToDate') && control.get('fcToDate').value ) {
        isValid = true;
    }
    return !isValid ? { minimumSearch: true } : null;
};
