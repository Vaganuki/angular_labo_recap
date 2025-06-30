import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from '../interfaces/participation.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl = 'http://localhost:3000/participations';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private get authHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createParticipation(participation: Participation): Observable<Participation> {
    return this.http.post<Participation>(this.baseUrl, participation, {
      headers: this.authHeaders
    });
  }

  getUserParticipations(userId: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.baseUrl}?userId=${userId}`, {
      headers: this.authHeaders
    });
  }
}
