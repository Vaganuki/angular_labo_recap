import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/register.interface';
import { LoginData } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }


  saveToken(token: string): void {
    localStorage.setItem('token', token);

    const decoded = this.decodeToken(token);
    const userId = decoded.sub;

    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      console.error("Impossible de récupérer l'ID utilisateur depuis le token.");
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  // 🔍 Ajout : méthode pour décoder un token
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
