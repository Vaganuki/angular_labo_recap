import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegisterData} from '../interfaces/register.interface';
import {LoginData} from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private http = inject(HttpClient);

  constructor() {}


  // Comportement initial selon la présence d’un token
  private loggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  // Observable public pour s’abonner à l’état connecté
  public isLoggedIn$ = this.loggedIn$.asObservable();

  login(data: LoginData): Observable<{ accessToken: string }> {
    return new Observable(observer => {
      this.http.post<{ accessToken: string }>(`${this.baseUrl}/login`, data)
        .subscribe({
          next: (res) => {
            this.saveToken(res.accessToken);
            this.loggedIn$.next(true);
            observer.next(res);
            observer.complete();
          },
          error: err => {
            console.error('💥 ERREUR reçue :', err);
            if (err.status === 400) {
              alert('❌ Champs invalides ou manquants.');
            } else if (err.status === 403) {
              alert('⛔ Session expirée, veuillez vous reconnecter.');
            } else if (err.status === 0) {
              alert('🚫 Une erreur est survenue.');
            } else {
              alert('❌ Une erreur inconnue est survenue.');
            }
          }
        });
    });

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
    this.loggedIn$.next(false);
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
