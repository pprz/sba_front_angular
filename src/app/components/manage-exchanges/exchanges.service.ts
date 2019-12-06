import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {Exchange} from './exchange';
import { MsgService } from './msg.service';
import { LocalURL } from '../../config/global-config';
import { HandleErrorService } from '../../service/handleError.service';
// import { GlobalService } from '../../service/global.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  // readonly exchangesUrl = LocalURL.serverURL + 'exchange';
  readonly exchangesUrl = 'http://localhost:8081/search/exchange';
  // private exchangesUrl = 'api/exchange';  // URL to web api
  constructor(
    private http: HttpClient,
    // private msgService: MsgService,
    public handleErrorService: HandleErrorService
    ) { }

  /** GET exchanges from the server */
  // getExchanges(): Observable<Exchange[]> { // memory测试用
  //   return this.http.get<Exchange[]>(this.exchangesUrl) // memory测试用
  getExchanges(): Observable<any> {
    console.log ('getExchanges success!');
    console.log ('exchangesUrl', this.exchangesUrl);
    return this.http.get<any>(this.exchangesUrl)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        catchError(this.handleErrorService.handleError)
        // catchError(this.handleError<Exchange[]>('getExchanges', [])) // memory测试用
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     // this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // private log(message: string) {
  //   this.msgService.add(`ExchangeService: ${message}`);
  // }
}


