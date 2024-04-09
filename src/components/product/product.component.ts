import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule],
  providers:[ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  btnSortToggle = "Low to High";
  Products:ProductModel[]=[];
  constructor(private service:ProductService){}
  ngOnInit(): void {
    this.service.getProducts().subscribe({
      next:(data)=> {this.Products = GeneralMethods.CastProducts(data);console.log(this.Products);},
      error:(err)=> console.log(err)
    });
    throw new Error('Method not implemented.');
  }
  toggleSort() {
    if (this.btnSortToggle === "Low to High") {
      this.Products.sort((a, b) => (a.price * (1-(a.discount/100))) - (b.price * (1-(b.discount/100))));
      this.btnSortToggle = "High to Low";
    } else {
      this.Products.sort((a, b) => (b.price * (1-(b.discount/100))) - (a.price * (1-(a.discount/100))) );
      this.btnSortToggle = "Low to High";
    }
  }
}
