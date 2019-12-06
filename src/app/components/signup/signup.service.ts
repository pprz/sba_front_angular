import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../../service/global.service';
import { HandleErrorService } from '../../service/handleError.service';
import { HeaderService } from '../../service/header.service';
import { catchError, retry } from 'rxjs/operators';
import { Signup } from './signup';
import { LocalURL } from '../../config/global-config';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
        public handleErrorService: HandleErrorService,
        public headerService: HeaderService
    ) { }

    readonly signupURL = LocalURL.serverURL + 'smc/users/signup';

    public addUser(signupForm: Signup): Observable<any> {
        console.log('addUser() done!');
        console.log('signupUrl', this.signupURL);
        console.log('signupForm', signupForm);
        return this.http.post<any>(this.signupURL, signupForm, this.headerService.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleErrorService.handleError)
            );
    }

}
