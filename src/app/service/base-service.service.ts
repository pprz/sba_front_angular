import { Injectable } from '@angular/core';
import { TopMenu } from '../components';
import { HttpClient } from '@angular/common/http';
import { Authresponse } from '../service/authresponse';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

constructor(private http: HttpClient) {
}

currUser: Authresponse = {
  token: localStorage.getItem('JWT-Token'),
  name: '',
  role: ''
};

topMenus: TopMenu[] = [
  { title: 'Import Data', link: 'importExcel', id: 1 },
  { title: 'Manage Company', link: 'manageCompanies', id: 2 },
  { title: 'Manage Exchange', link: 'manageExchanges', id: 3 } ,
  { title: 'Update IPO details', link: 'manageIPO', id: 4 },
  { title: 'IPOs', link: 'IPOs', id: 5 },
  { title: 'Compare Company', link: 'compareCompany', id: 6 },
  { title: 'Compare Sectors', link: 'compareSectors', id: 7 },
  { title: 'other', link: 'other', id: 8 }
];

//  neo start
getTabs() {
  return this.topMenus;
}

getCurrentUser() {
  return this.currUser;
}

setCurrentUser(authres: Authresponse) {
  this.currUser = authres;
}

getSomeData() {
  return this.http.get('http://localhost:8080/smc/secure/authenticated');
}
//  neo end

}
