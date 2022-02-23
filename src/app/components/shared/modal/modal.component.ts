import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  hideModal() {
    this.onHide.emit();
  }
}
