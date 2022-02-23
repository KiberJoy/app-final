import { FormControl } from '@angular/forms';

export function imageTypeValidation(control: FormControl) {
  let allowedTypes: string[] = ['image/jpg', 'image/jpeg'];
  if (!allowedTypes.includes(control?.value?.type)) {
    return { 'incorrectType': true };
  }
  return null;
}
