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
  updateCategory(cat: any): Observable<Object> {
    return this.http.put(this.URL, cat);
  }
  addCategory(cat: any): Observable<Object> {
    return this.http.post(this.URL, cat);
  }
  deleteCategory(id: string): Observable<Object> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
