import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PositionModel } from 'src/app/models/position.model';



@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
})
export class RadioButtonComponent implements OnInit {
  @Input() items: PositionModel[] = [];
  @Input() control!: FormControl;


  public _selectedItem!: PositionModel;

  ngOnInit(): void {
    this._selectedItem = this.items[0];

  }
}
