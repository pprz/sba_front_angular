import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router'; // 路由传参用到
import { LocalURL } from '../../config/global-config';


const BSEURL = LocalURL.serverURL + 'securityuser';

// const BSEURL = "http://localhost:8089";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  message: string;
  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit() {
    let headers = { headers: new HttpHeaders({ "Authorization": "shazi "+ localStorage.getItem('JWT-Token')})}
    this.http.get(BSEURL + "/logout/"+localStorage.getItem('currUserName'), headers)
      .subscribe(res=>{
        // this.message=
        this.getFirstData(res);
      });

  }

  getFirstData(returnedObj: any){
    // alert(returnedObj.msg);
    if(returnedObj.status==200){
      this.router.navigateByUrl('/login');
    }
  }

}
