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
  Products:ProductModel[]=[];
  constructor(private service:ProductService){}
  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next:(data)=> {this.Products = GeneralMethods.CastProducts(data);console.log(this.Products);},
      error:(err)=> console.log(err)
    });
    throw new Error('Method not implemented.');
  }

}
