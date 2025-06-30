import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventData} from "../interfaces/event.interface";

@Injectable({ providedIn: 'root' })
export class EventService {
  private baseUrl = 'http://localhost:3000/events'; // adapte selon ton backend

  private http =  inject(HttpClient);

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(this.baseUrl);
  }
}
