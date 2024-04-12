import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
  private URL = `${this.BASE_URL}/`
  constructor(http: HttpClient) { super(http) }

  getDashboard(): Observable<Object> {
    return this.http.get(this.URL);
  }
}

