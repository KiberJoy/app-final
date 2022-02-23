import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {
  @HostBinding('class.app-wrapper') hostClass = true;
}
