import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BaseServiceService } from '../service/base-service.service';
import { Authresponse } from '../service/authresponse';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

  constructor(private service: BaseServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const user: Authresponse = this.service.getCurrentUser();
    // const token = user.token;
    const modifiedReq = req.clone({
      setHeaders: {
        // token: token.toString()
        Authorization: 'Shazi ' + localStorage.getItem('JWT-Token')
      }
    });
    return next.handle(modifiedReq);
  }
}
