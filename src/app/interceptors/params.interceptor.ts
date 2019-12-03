import { Injectable } from '@angular/core';
import { user, BaseServiceService } from '../service/base-service.service';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(private service:BaseServiceService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user:user=this.service.getCurrentUser()
    const token=user.token
    const modifiedReq=req.clone({
      setHeaders:{
        token:token.toString()
      }
    })
    return next.handle(modifiedReq);
  }
}