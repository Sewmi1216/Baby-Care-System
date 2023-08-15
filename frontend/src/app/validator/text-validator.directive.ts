import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
  selector: '[appTextValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: TextValidatorDirective, multi: true}]
})
export class TextValidatorDirective implements Validator{
  validate(control: AbstractControl): { [key: string]: any } | null {
    let TEXT_REGEX = /^[A-Za-z. ]+$/; // Regular Expression 1
    if (control.value != undefined) {
      if (control.value.length == 0 || TEXT_REGEX.test(control.value)) {
        return null;
      } else {
        control.setValue(control.value.substr(0, control.value.length - 1))
        return null;
      }
    } else {
      return null;
    }

    return {'textInvalid': true};
  }
  constructor() { }

}
