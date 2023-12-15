import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthLogin } from '../infraestructure/driven-adapter/request-api/auth-login.service';
import { UserService } from 'src/store/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthLogin,
    private userService:UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    
    const token = localStorage.getItem('token');

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
            console.log('aqui llegue');
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokenResponse: any) => {
            console.log(tokenResponse);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokenResponse.data.token);
          this.userService.refreshToken(tokenResponse.data.token, tokenResponse.data.refresh_token)
          return next.handle(this.addToken(request, tokenResponse.data.token));
        }),
        catchError((refreshError) => {
          this.isRefreshing = false;
          // Manejar errores de renovación de token según tus necesidades
          return throwError(refreshError);
        }),
        filter((response) => response !== null),
        take(1)
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap(() => {
          console.log(request);
          return next.handle(this.addToken(request, ''));
        })
      );
    }
  }
}