import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  private URL = `${this.BASE_URL}/category`

  constructor(http: HttpClient) { super(http); }

  getCategories(): Observable<Object> {
    return this.http.get(this.URL);
  }
}
