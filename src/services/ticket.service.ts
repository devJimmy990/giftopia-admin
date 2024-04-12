import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService {
  private URL = `${this.BASE_URL}/ticket`

  constructor(http: HttpClient) { super(http); }

  getTickets(): Observable<Object> {
    return this.http.get(this.URL);
  }
}

