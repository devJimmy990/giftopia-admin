import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  private URL = `${this.BASE_URL}/order`

  constructor(http: HttpClient) { super(http); }

  getOrders(): Observable<Object> {
    return this.http.get(this.URL);
  }
}
