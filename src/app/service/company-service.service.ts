import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Company } from '../config/company';
import { LocalURL } from '../config/global-config';
import { HandleErrorService } from './handle-error.service';
import { ApiResponse } from '../config/api.response';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  readonly allcompaniesUrl = 'http://localhost:8080/search/company';
  // readonly testcompaniesUrl = 'http://localhost:8089/company';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public handleErrorService: HandleErrorService
  ) { }

  /* GET exchanges from the server */
  // getCompanies(): Observable<Company[]> { // memory测试用
  //    return this.http.get<Company[]>(this.allcompaniesUrl) // memory测试用
  // }
  getCompanies(): Observable<any> {
    console.log ('getCompanies success!');
    console.log ('getCompanies', this.allcompaniesUrl);
    return this.http.get<any>(this.allcompaniesUrl)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        //catchError(this.handleErrorService.handleError),
        tap(_ => this.log('fetched companies(tap)')),
        catchError(this.handleError<any>('getCompanies'))
      );
  }
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CompanyService: ${message}`);
  }
}
