import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponseDto } from '@crypto-shop/services-shared';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.includes('logout')) {
      localStorage.removeItem('authorization');
      return of(new HttpResponse({ status: 200 }));
    }

    let updatedRequest: HttpRequest<any>;
    const jwtToken = localStorage.getItem('authorization');
    if (jwtToken) {
      updatedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
      });
    } else {
      updatedRequest = req.clone();
    }
    return next.handle(updatedRequest).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // @ts-ignore
          const responseBodyAsLoginResponse: LoginResponseDto = event.body;
          if (responseBodyAsLoginResponse?.access_token) {
            localStorage.setItem(
              'authorization',
              responseBodyAsLoginResponse?.access_token
            );
          }
        }
      })
    );
  }
}
