import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/register.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserById(id: string | number): Observable<RegisterData> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Utilisateur non authentifié');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RegisterData>(`${this.baseUrl}/${id}`, { headers });
  }

  getCurrentUser(): Observable<RegisterData> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('ID utilisateur non trouvé');
    }
    return this.getUserById(userId);
  }

  updateUser(userId: string, updatedData: Partial<RegisterData>): Observable<any> {
    const token = this.authService.getToken();

    if (!token) throw new Error('Utilisateur non authentifié');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch(`${this.baseUrl}/${userId}`, updatedData, { headers });
  }

  getUserParticipations(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}/participations?_expand=event`);
  }


  updatePassword(userId: string | null, newPassword: string): Observable<any> {
    if (!userId) {
      throw new Error('ID utilisateur manquant');
    }

    const token = this.authService.getToken();

    if (!token) {
      throw new Error('Utilisateur non authentifié');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch(`${this.baseUrl}/${userId}`, {
      password: newPassword
    }, { headers });
  }

  deleteCurrentUser(): Observable<void> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('ID utilisateur non trouvé');
    }

    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Utilisateur non authentifié');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.baseUrl}/${userId}`, { headers });
  }

}
