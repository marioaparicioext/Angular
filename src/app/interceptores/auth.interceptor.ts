import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServicio } from '../login/servicios/login.servicio';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginServicio) {}

  //Se revisan las peticiones recibidas
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.loginService.getToken();
    if(token){
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      
      return next.handle(cloned)
    }
    console.log(request, "REQ")
    return next.handle(request);
  }
}
