import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_TOKEN = environment.API_TOKEN;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = API_TOKEN
    const authRequest = req.clone({
      headers: req.headers.set('Authorization',"Bearer "+authToken)
    });
    return next.handle(authRequest);
  }
}