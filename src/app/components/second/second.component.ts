import { Component } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
})
export class SecondComponent {
  public scroll() {
    const block = document.getElementById('app-fourth');
    block!.scrollIntoView({behavior: 'smooth'});
  }
}
