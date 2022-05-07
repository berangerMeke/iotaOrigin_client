import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {AuthService} from './auth.service';
//import { request } from 'http';



@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor( 
      private router: Router,
      private tokenService: TokenService,
      private authService: AuthService
      ) {}
  
    intercept (request: HttpRequest<any>, next: HttpHandler): any {

      console.log('interceptor !');

      const token = this.tokenService.getToken();
      const refreshToken = this.tokenService.getRefreshToken();

      if(token){
        console.log(token);
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
      }

      if(!request.headers.has('Content-type')){
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }

      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      })

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse) {
            console.log('event---->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if(error.status === 401) {
            if(error.error.error === 'invalid_token') {
              // this.authService.refreshToken({refresh_token: refreshToken})
              //   .subscribe(() =>{
              //     location.reload();
              //   });
            } else {
              this.router.navigate(['']).then(_=> console.log('redirect home page'));
            }           
          }
          return throwError(error);
        })
      )

    }  
}