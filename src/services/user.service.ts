import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private URL = `${this.BASE_URL}/user`

  constructor(http: HttpClient) { super(http); }

  getUsers(): Observable<Object> {
    return this.http.get(this.URL);
  }
  getUserByID(id: string): Observable<Object> {
    return this.http.get(`http://localhost:7050/user/${id}`);
  }
}
