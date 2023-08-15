import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator{
  validate(control: AbstractControl): { [key: string]: any } | null {
    let EMAIL_REGEX = /^[a-z.]+[0-9a-z]+[@][0-9a-z]+[.][0-9a-z]+$/; // Regular Expression 1

    if (control.value != undefined) {
      if (control.value.length == 0 || EMAIL_REGEX.test(control.value)) {
        return null;
      }
    } else {
      return null;
    }

    if (control.value === null) {
      return null;
    }

    return {'emailInvalid': true};
  }
  constructor() { }

}
