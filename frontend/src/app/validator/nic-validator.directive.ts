import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
  selector: '[appNicValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NicValidatorDirective, multi: true}]
})
export class NicValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    let NIC_REGEX1 = /^[0-9]{9}[Vv]$/; // Regular Expression 1
    let NIC_REGEX2 = /^[0-9]{12}$/; // Regular Expression 1

    if (control.value != undefined) {
      if (control.value.length == 0 || NIC_REGEX1.test(control.value) || NIC_REGEX2.test(control.value)) {
        if (NIC_REGEX1.test(control.value) && control.value.substr(control.value.length - 1, control.value.length) !== 'V') {
          control.setValue(control.value.substr(0, control.value.length - 1) + 'V')
        }
        return null;
      }
    }

    return {'nicInvalid': true};
  }

  constructor() {
  }

}
