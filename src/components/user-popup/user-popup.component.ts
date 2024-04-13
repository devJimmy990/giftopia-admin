import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.css'
})
export class UserPopupComponent {
  @Input() popupUser: any;
  @Output() close = new EventEmitter();

  closePopup() {
    this.close.emit(false);
  }
}
