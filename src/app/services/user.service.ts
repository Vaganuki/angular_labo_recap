import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/register.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserById(id: string | number): Observable<RegisterData> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Utilisateur non authentifié');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RegisterData>(`${this.baseUrl}/users/${id}`, { headers });
  }

  getCurrentUser(): Observable<RegisterData> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('ID utilisateur non trouvé');
    }
    return this.getUserById(userId);
  }
}
