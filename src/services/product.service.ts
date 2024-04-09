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

  getProductsByCategory(catID: string): Observable<Object> {
    return this.http.get(`${this.URL}/category/${catID}`);
  }

  getProductByID(Pid: string): Observable<Object> {
    return this.http.get(`${this.URL}/${Pid}`);
  }
}
