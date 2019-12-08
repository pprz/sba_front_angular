import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    public httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // 自己加着玩
          'JWT-Token': 'aabbcc'
        })
      };

}
