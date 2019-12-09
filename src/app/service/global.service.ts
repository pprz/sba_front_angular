import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public userId: string;
  public userName: string;
  public userRole: string;
  public infoMessage: string;
  public errorMessage: string;

}
