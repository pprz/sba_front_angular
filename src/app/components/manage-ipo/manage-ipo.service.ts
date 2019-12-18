import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HandleErrorService } from '../../service/handleError.service';
import { IPO } from './ipo';
import { LocalURL } from '../../config/global-config';

@Injectable({
  providedIn: 'root'
})
export class ManageIpoService {

  // readonly allIposUrl = 'http://localhost:8082/search/ipo';
  readonly allIposUrl = LocalURL.serverURL + 'searchsector/search/ipo';

  // readonly updateipoUrl = 'http://localhost:8081/ipo';
  readonly updateipoUrl = LocalURL.serverURL + 'companyipo/admin/manage/ipo';

  constructor(
    private http: HttpClient,
    public handleErrorService: HandleErrorService
    ) { }

  getIPOs(): Observable<any> {
    console.log ('get all IPOs success!');
    console.log ('getAllIposUrl', this.allIposUrl);
    return this.http.get<any>(this.allIposUrl)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        catchError(this.handleErrorService.handleError)
      );
  }

  getCurrentIpo(ipoID: number): Observable<any> {
    console.log('getCurrentIPO URL', `${this.allIposUrl}/${ipoID}`);
    return this.http.get<any>(`${this.allIposUrl}/${ipoID}`)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        catchError(this.handleErrorService.handleError)
      );
  }

  updateIpo(Updateipo: IPO): Observable<any> {
    console.log('updateIPO() done!');
    console.log('updateipoUrl', this.updateipoUrl);
    console.log('Updateipo', Updateipo);
    return this.http.put(this.updateipoUrl, Updateipo)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        catchError(this.handleErrorService.handleError)
      );
  }
}
