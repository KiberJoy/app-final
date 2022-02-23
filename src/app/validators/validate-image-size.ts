import { FormControl } from '@angular/forms';

export function imageSizeValidation(control: FormControl) {
  const maxSize: number = 5242880;
  if (control.value?.size > maxSize) {
    return { 'incorrectSize': true };
  }
  return null;
}
