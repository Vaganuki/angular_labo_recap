import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event.interface';

@Injectable({ providedIn: 'root' })
export class EventService {
private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
