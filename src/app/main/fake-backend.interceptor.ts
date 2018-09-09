import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http/src/response';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      if (req.url.endsWith('/users/login') && req.method === 'POST') {
        const {email, password} = req.body;
        if (email === 'konstantin@mail.ru' && password === '123') {
          const body = {
            email,
            token: 'fake-jwt-token'
          };
          return of(new HttpResponse({status: 200, body}));
        } else {
          return throwError(401);
        }
        
      }
      return next.handle(req);
    }))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
  }
}
