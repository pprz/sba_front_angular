import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Company } from '../config/company';
import { CompanyIPO } from '../config/company';
import { LocalURL } from '../config/global-config';
import { HandleErrorService } from './handle-error.service';
import { ApiResponse } from '../config/api.response';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  // readonly allcompaniesUrl = 'http://9.112.80.151:8081/search/company';
  readonly allcompaniesUrl = LocalURL.serverURL + 'searchsector/search/company';
  // readonly companyUrl = 'http://9.112.80.151:8082/company';
  readonly companyUrl = LocalURL.serverURL + 'companyipo/admin/manage/company';
  // readonly updatecompanyUrl = 'http://localhost:8088/company';
  // readonly currentcompanyUrl = 'http://9.112.80.151:8081/search/company_id';
  readonly currentcompanyUrl = LocalURL.serverURL + 'searchsector/search/company_id';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public handleErrorService: HandleErrorService
  ) { }

  /* GET Companys from the server */
  // getCompanies(): Observable<Company[]> { // memory测试用
  //    return this.http.get<Company[]>(this.allcompaniesUrl) // memory测试用
  // }
  getCompanies(): Observable<any> {
    console.log ('getCompanies success!');
    console.log ('getCompanies', this.allcompaniesUrl);
    return this.http.get<any>(this.allcompaniesUrl)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        // catchError(this.handleErrorService.handleError),
        tap(_ => this.log('fetched companies(tap)')),
        catchError(this.handleError<any>('getCompanies'))
      );
  }
  addCompany(company: Company): Observable<any> {
    console.log('addCompany() done!');
    console.log('addCompanysUrl', this.companyUrl);
    console.log('AddCompany', company);
    return this.http.post<any>(this.companyUrl, company)
            .pipe(
                retry(1), // retry a failed request up to 1 times
                tap(_ => this.log('add new company(tap)')),
                catchError(this.handleError<any>('addCompany'))
            );
  }
  addCompanyIpo(companyipo: CompanyIPO): Observable<any> {
    return this.http.post<any>(this.companyUrl, companyipo)
            .pipe(
                retry(1), // retry a failed request up to 1 times
                tap(_ => this.log('add new companyipo(tap)')),
                catchError(this.handleError<any>('addCompanyIpo'))
            );
  }
  getCurrentCompany(companyid: number ): Observable<any> {
    console.log('getCurrentExchange URL', `${this.currentcompanyUrl}/${companyid}`);
    return this.http.get<any>(`${this.currentcompanyUrl}/${companyid}`)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        tap(_ => this.log('get current company(tap)')),
        catchError(this.handleError<any>('getCurrentCompany'))
      );
  }

  updateCompany(updatedCompany: Company): Observable<any> {
    console.log('updateCompany() done!');
    console.log('companyUrl', this.companyUrl);
    console.log('updateCompany', updatedCompany);
    return this.http.put(this.companyUrl, updatedCompany)
            .pipe(
                retry(1), // retry a failed request up to 1 times
                catchError(this.handleErrorService.handleError)
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
