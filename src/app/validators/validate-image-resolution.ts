import { FormControl } from '@angular/forms';

export function imageResolutionValidation(control: FormControl) {
  if (control.value?.size < (70 * 70)) {
    return { 'incorrectResolution': true };
  }
  return null;
}
