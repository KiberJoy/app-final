import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @HostBinding('class.app-button') hostClass = true;
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
