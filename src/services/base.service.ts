import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // protected BASE_URL = 'https://giftopiabackend.onrender.com/admin';
  protected BASE_URL = 'http://localhost:7050/admin';
 
  constructor(protected http: HttpClient) {
    // const token = this.getCurrentToken();
    // if (token) {
    //   this.overrideMethods(token);
    // }
  }

  private overrideMethods(token: string | null) {
    const methodsToOverride = ['get', 'post', 'put', 'delete'];
    methodsToOverride.forEach((method) => {
      const originalMethod = (this.http as any)[method];
      (this.http as any)[method] = (...args: any[]): Observable<any> => {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', `${token}`);
        args[1] = { ...args[1], headers: headers };
        return originalMethod.apply(this.http, args);
      };
    });
  }

  private getCurrentToken(): string | null {
    return localStorage.getItem('token');
  }
}
