
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment'; 
import { TokenService } from './token.service'; 
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const OAUTH_CLIENT = 'express-client';
const OAUTH_SECRET = 'express-secret';
const API_URL = environment.base_url;
const AUTH_URL = environment.auth_Url;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 
  'Content-Type': 'application/x-www-form-urlencoded',
})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';

  private static handleError(error : HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    }else{
      console.error(
        'Backend returned code ${error.status}',
        'body was: ${error.error}'
      );
    }
    return throwError(
      'Une erreur est survenue : veillez réessayer plus tard.'
    );
  }

  private static log(message: string): any {
    console.log(message);
  };
  
  constructor(private http: HttpClient, private tokenServive: TokenService) { }

  login(loginData: any): Observable<any> {
    console.log(loginData);
    this.tokenServive.removeToken();
    this.tokenServive.removeRefreshToken();
    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', loginData.password);
    return this.http.post<any>(AUTH_URL, body, HTTP_OPTIONS)    
        .pipe(tap(res => {
          console.log(res.access_token);
          this.tokenServive.saveToken(res.access_token);
          this.tokenServive.saveRefreshToken(res.refresh_token);
        }),
          catchError(AuthService.handleError));
  }


  refreshToken(refreshData: any): Observable<any> {
    this.tokenServive.removeToken();
    this.tokenServive.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');

    return this.http.post<any>(API_URL + 'spring-security-oauth-server/oauth/token', body, HTTP_OPTIONS)
      .pipe(tap(res => {
        this.tokenServive.saveToken(res.access_token);
        this.tokenServive.saveRefreshToken(res.refresh_token);
      }),
      catchError(AuthService.handleError));  
  }


  logout(): void {
    this.tokenServive.removeToken();
    this.tokenServive.removeRefreshToken();
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(API_URL + 'oauth/signup', data)
      .pipe(tap( _=> AuthService.log('register')),
      catchError(AuthService.handleError));
  }


}
