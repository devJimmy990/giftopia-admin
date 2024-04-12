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
  showDropdown = false;
  btnDisplayToggle = "View";
  @Input() isViewPopup = false;
  btnSortToggle = "Low to High";
  Products: ProductModel[] = [];
  @Input() isDetailsPopup = false;

  constructor(private service: ProductService) { }

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
  }

  sortByCategories() {
    this.Products.sort((a, b) => (a.cat[0].localeCompare(b.cat[0])));
  }
}
