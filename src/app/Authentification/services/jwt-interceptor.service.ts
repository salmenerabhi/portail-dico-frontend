import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable} from "rxjs";
import {TokenService} from "./token.service";
import {LoaderService} from "../../services/loader.service";
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService  implements HttpInterceptor{

  constructor(private token: TokenService,
              private load:LoaderService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token.getToken()}`,

      }
    });
this.load.isloading.next(true);
    return next.handle(request).pipe(finalize(()=>{
      this.load.isloading.next(false);
    }));


  }
}