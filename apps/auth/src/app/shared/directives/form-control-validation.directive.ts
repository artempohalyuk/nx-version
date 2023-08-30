import { Directive, Input, HostBinding } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[nxFormControlValidation]',
  standalone: true
})
export class FormControlValidationDirective {
  @Input('nxFormControlValidation') control!: AbstractControl | null;

  @HostBinding('class.border-red-500') get borderClass() {
    return (this.control?.invalid || this.control?.errors) && (this.control?.dirty || this.control?.touched);
  }
}