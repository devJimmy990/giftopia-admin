import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-product',
  standalone: true,
  imports: [],
  templateUrl: './popup-product.component.html',
  styleUrl: './popup-product.component.css'
})
export class PopupProductComponent {
  imageIndex = 0;
  @Input() popupProduct: any;
  @Output() close = new EventEmitter();

  closePopup() {
    this.close.emit(false);
  }
  swipImage(dir: string) {
    dir === "next" ?
      this.popupProduct.images.length - 1 === this.imageIndex ? this.imageIndex = 0 : ++this.imageIndex
      : this.imageIndex === 0 ? this.popupProduct.images.length - 1 : --this.imageIndex;
  }

  calcRateStars() {
    let rate = {
      value: Math.ceil(this.popupProduct.star / this.popupProduct.numberOfRates),
      text: ""
    };
    for (var i = 0; i < 5; i++)
      i < rate.value ?
        rate.text += "★"
        : rate.text += "☆";
    return rate;
  }
}
