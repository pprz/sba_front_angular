import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../../service/global.service';
import { HandleErrorService } from '../../service/handleError.service';
import { HeaderService } from '../../service/header.service';
import { catchError, retry } from 'rxjs/operators';
import { Login } from './login';
import { LocalURL } from '../../config/global-config';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
        public handleErrorService: HandleErrorService,
        public headerService: HeaderService
    ) { }

    readonly loginURL = LocalURL.serverURL + 'smc/secure/login';

    // Observable<any> 定义返回类型
    public findUser(loginForm: Login): Observable<any> {
        console.log('findUser() done!');
        console.log('loginUrl', this.loginURL);
        console.log('loginForm', loginForm);
        return this.http.post<any>(this.loginURL, loginForm, this.headerService.httpOptions)
            .pipe(
                retry(1), // retry a failed request up to 1 times
                catchError(this.handleErrorService.handleError)
            );

        // const id = 1; // memory测试用
        // return this.http.get<any>(`api/users/${id}`); // memory测试用
        // // or直接用下面的
        // return this.http.get<any>('api/users/1'); // memory测试用
    }

}
