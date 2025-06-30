import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendData } from '../interfaces/friend.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private baseUrl = 'http://localhost:3000/friends';

  private authService = inject(AuthService);
  private http = inject(HttpClient);

  private get authHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) throw new Error('Utilisateur non authentifié');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  sendRequest(senderId: number, receiverId: number): Observable<FriendData> {
    const friendData: FriendData = {
      isAccepted: false,
      senderId,
      receiverId
    };
    return this.http.post<FriendData>(this.baseUrl, friendData, { headers: this.authHeaders });
  }

  acceptRequest(friendId: number): Observable<FriendData> {
    return this.http.patch<FriendData>(`${this.baseUrl}/${friendId}`, { isAccepted: true }, { headers: this.authHeaders });
  }

  declineRequest(friendId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${friendId}`, { headers: this.authHeaders });
  }
}
