import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authresponse {

  public name: string;
  public role: string;
  public token: string;

}


// export class Authresponse {
//   token: string;
//   name: string;
//   role: string;
// }
