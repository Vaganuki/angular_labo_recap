import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/register.interface';
import { AuthService } from './auth.service';
import {FriendData} from '../interfaces/friend.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  private authService = inject(AuthService);
  private http = inject(HttpClient);

  private get authHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Utilisateur non authentifié');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<RegisterData[]> {
    return this.http.get<RegisterData[]>(this.baseUrl, { headers: this.authHeaders });
  }

  getUserById(id: string | number): Observable<RegisterData> {
    return this.http.get<RegisterData>(`${this.baseUrl}/${id}`, { headers: this.authHeaders });
  }

  getCurrentUser(): Observable<RegisterData> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('ID utilisateur non trouvé');
    }
    return this.getUserById(userId);
  }

  updateUser(userId: string, updatedData: Partial<RegisterData>): Observable<any> {
    const headers = this.authHeaders.append('Content-Type', 'application/json');
    return this.http.patch(`${this.baseUrl}/${userId}`, updatedData, { headers });
  }

  getUserParticipations(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}/participations?_expand=event`);
  }

  updatePassword(userId: string | null, newPassword: string): Observable<any> {
    if (!userId) {
      throw new Error('ID utilisateur manquant');
    }
    const headers = this.authHeaders.append('Content-Type', 'application/json');
    return this.http.patch(`${this.baseUrl}/${userId}`, {
      password: newPassword
    }, { headers });
  }

  deleteCurrentUser(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${localStorage.getItem('userId')}`, { headers: this.authHeaders });
  }

      //Amis

  getFriends(userId: string): Observable<FriendData[]> {
    return this.http.get<FriendData[]>(`${this.baseUrl}/${userId}/friends`, { headers: this.authHeaders });
  }

  getUserFriendsByStatus(userId: string, isAccepted: boolean): Observable<FriendData[]> {
    const params = new HttpParams().set('isAccepted', String(isAccepted));
    return this.http.get<FriendData[]>(`${this.baseUrl}/${userId}/friends`, { headers: this.authHeaders, params });
  }

  searchUsersByPseudo(pseudo: string): Observable<RegisterData[]> {
    const params = new HttpParams().set('pseudo_like', pseudo);
    return this.http.get<RegisterData[]>(this.baseUrl, { headers: this.authHeaders, params });
  }

}
