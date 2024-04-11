import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-product',
  standalone: true,
  imports: [],
  templateUrl: './popup-product.component.html',
  styleUrl: './popup-product.component.css'
})
export class PopupProductComponent {
  @Input() popupProduct: any;
  @Output() close = new EventEmitter();

  closePopup() {
    this.close.emit(false);
  }
}
