import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
const BSEURL = "http://localhost:8089";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let headers = { headers: new HttpHeaders({ "Authorization": "shazi "+ localStorage.getItem('JWT-Token')})}
    this.http.get(BSEURL + "/logout/{username}", headers)
      .subscribe(res=>{
        
      });
  }

}
