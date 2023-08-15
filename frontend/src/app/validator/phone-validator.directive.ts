import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {TextValidatorDirective} from "./text-validator.directive";

@Directive({
  selector: '[appPhoneValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true}]
})
export class PhoneValidatorDirective implements Validator {

  setLetter = true;

  validate(control: AbstractControl): { [key: string]: any } | null {
    let TELEPHONE_REGEX = /^[0-9]{3}[-][0-9]{7}$/; // Regular Expression 1
    if (control.value != undefined) {
      if (control.value.length == 0 || TELEPHONE_REGEX.test(control.value)) {
        return null;
      }
      if (control.value.length === 2) {
        this.setLetter = true;
      } else if (control.value.length === 3 && this.setLetter) {
        control.setValue(control.value + '-')
      } else if (control.value.length === 4) {
        this.setLetter = false;
      }
    }

    return {'phoneInvalid': true};
  }

  constructor() {
  }

}
