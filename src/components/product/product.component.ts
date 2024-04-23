import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';
import { HttpClientModule } from '@angular/common/http';
import { PopupProductComponent } from '../popup-product/popup-product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule, PopupProductComponent, ProductDetailsComponent],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  showTop = false;
  popupProduct: any;
  selectedProduct: any;
  customColumn = "price";
  showRateDropdown = false;
  showSalesDropdown = false;
  showPriceDropdown = false;
  btnDisplayToggle = "View";
  @Input() isViewPopup = false;
  btnSortToggle = "Low to High";
  Products: ProductModel[] = [];
  @Input() isDetailsPopup = false;

  constructor(private service: ProductService) {
    window.addEventListener('scroll', (e: any) =>
      e.srcElement.scrollTop > 0 ? this.showTop = true : this.showTop = false
      , true);
  }

  ngOnInit(): void {

    this.service.getProducts().subscribe({
      next: (data) => this.Products = GeneralMethods.CastProducts(data),
      error: (err) => console.log(err)
    });
  }
  moveTop() {
    const top = document.getElementById('top');
    if (top) {
      top.scrollIntoView({ behavior: 'smooth' });
    }
  }
  viewProduct(prd: ProductModel) {
    this.popupProduct = prd;
    this.isViewPopup = true;
    console.log(prd);
  }
  openDetailedPopup() {
    this.selectedProduct = null;
    if (this.isViewPopup) this.isViewPopup = false;
    this.isDetailsPopup = true;
    this.moveTop();
  }

  editProduct(prd: ProductModel) {
    this.openDetailedPopup();
    console.log(prd);
    this.selectedProduct = prd;
  }
  deleteProduct(id: string, name: string) {
    const res = confirm(`Are you sure you want to delete\n${name}`);
    if (res) {
      this.service.deleteProduct(id).subscribe({
        next: (data) => this.Products = this.Products.filter((product) => product._id !== id),
        error: (err) => console.log(err)
      });
    }
  }
  closePopup(e: any) {
    this.isViewPopup = false;
    this.isDetailsPopup = false;
    this.editProductDetalis(e);
  }
  editProductDetalis(e: any) {
    const prd = e.product;
    e.action === "add" ?
      this.Products.push(prd)
      : this.Products = this.Products.map((product) => {
        if (product._id === prd._id) { return prd; }
        return product;
      });
  }
  togglePriceSort(val: string) {
    val === "lth" ?
      this.Products.sort((a, b) => (a.price * (1 - (a.discount / 100))) - (b.price * (1 - (b.discount / 100))))
      : this.Products.sort((a, b) => (b.price * (1 - (b.discount / 100))) - (a.price * (1 - (a.discount / 100))));
      this.customColumn = "price";
  }
  toggleSalesSort(val: string) {
    const res = val === "lth" ?
      this.Products.sort((a, b) => (a.numberOfSellings - b.numberOfSellings))
      : this.Products.sort((a, b) => (b.numberOfSellings - a.numberOfSellings));
    console.log(res);
    this.customColumn = "sales";

  }
  toggleRateSort(val: string) {
    const res = val === "lth" ?
      this.Products.sort((a, b) => {
        const rateA = a.numberOfRates !== 0 ? Math.ceil(a.star / a.numberOfRates) : 0;
        const rateB = b.numberOfRates !== 0 ? Math.ceil(b.star / b.numberOfRates) : 0;
        return rateA - rateB;
      }) :
      this.Products.sort((a, b) => {
        const rateA = a.numberOfRates !== 0 ? Math.ceil(a.star / a.numberOfRates) : 0;
        const rateB = b.numberOfRates !== 0 ? Math.ceil(b.star / b.numberOfRates) : 0;
        return rateB - rateA;
      });
    this.customColumn = "rate";
  }
  
  sortByCategories() {
    this.Products.sort((a, b) => (a.cat[0].localeCompare(b.cat[0])));
  }
  hideAllDropDowns() {
    this.showRateDropdown = false;
    this.showSalesDropdown = false;
    this.showPriceDropdown = false;
  }
  hideAllDropExcept(val: string) {
    this.hideAllDropDowns();
    if (val === "rate") this.showRateDropdown = true;
    else if (val === "sales") this.showSalesDropdown = true;
    else if (val === "price") this.showPriceDropdown = true;
  }
  scroll() {
    console.log("scroll")
  }

  calcRateStars(prd:any) {
    let rate = {
      value: Math.ceil(prd.star / prd.numberOfRates),
      text: ""
    };
    for (var i = 0; i < 5; i++)
      i < rate.value ?
        rate.text += "★"
        : rate.text += "☆";
    return rate;
  }
}
