import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected BASE_URL = 'https://giftopiabackend.onrender.com/admin';
  constructor(protected http: HttpClient) { }
}
