import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  private URL = `${this.BASE_URL}/product`;

  constructor(http: HttpClient) { super(http) }

  getProducts(): Observable<Object> {
    return this.http.get(this.URL);
  }

  addProduct(prd: ProductModel): Observable<Object> {
    return this.http.post(this.URL, prd);
  }
  updateProduct(prd: ProductModel, id:string): Observable<Object> {
    return this.http.put(`${this.URL}/${id}`, prd);
  }
  deleteProduct(id: string): Observable<Object> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
