import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class LanguageInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
       const lang = localStorage.getItem('lang') || 'en' ;
        request= request.clone({
            setHeaders : {
                'Accept-Language': lang 
            }
        })
        return next.handle(request);
    }
}
