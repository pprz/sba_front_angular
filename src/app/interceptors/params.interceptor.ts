import { Injectable } from '@angular/core';
import { BaseServiceService } from '../service/base-service.service';
import { Authresponse } from '../service/authresponse';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(private service: BaseServiceService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user: Authresponse = this.service.getCurrentUser();
    const token = user.token;
    const modifiedReq = req.clone({
      setHeaders: {
        token: token.toString()
      }
    });
    return next.handle(modifiedReq);
  }
}
