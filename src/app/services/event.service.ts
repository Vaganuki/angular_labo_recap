import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private baseUrl = 'http://localhost:3000/events'; // adapte selon ton backend

  private http =  inject(HttpClient);

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
