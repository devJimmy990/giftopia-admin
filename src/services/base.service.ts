import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected BASE_URL = 'http://localhost:7050';
  constructor(protected http: HttpClient) { }
}
