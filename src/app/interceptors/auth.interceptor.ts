import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      const isAuthError = error.status === 401 || error.status === 403;
      const isAuthRoute = req.url.includes('/login');

      if (isAuthError && !isAuthRoute) {
        alert('⛔ Votre session a expiré. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        window.location.reload();
      }

      return throwError(() => error);
    })
  );
};
