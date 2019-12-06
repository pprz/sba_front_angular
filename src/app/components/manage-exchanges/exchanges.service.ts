import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';

import {Exchange} from './exchange';
import { MsgService } from './msg.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  private exchangesUrl = 'api/exchanges';  // URL to web api
  constructor(
    private http: HttpClient,
    private msgService: MsgService) { }

  /** GET exchanges from the server */
  getExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.exchangesUrl)
  // getExchanges(): Observable<any> {
  //   return this.http.get<any>(this.exchangesUrl)
      .pipe(
        tap(_ => this.log('fetched exchanges')),
        catchError(this.handleError<Exchange[]>('getExchanges', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.msgService.add(`ExchangeService: ${message}`);
  }
}


