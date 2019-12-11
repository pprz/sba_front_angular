import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router'; // 路由传参用到
import { LocalURL } from '../../config/global-config';


const BSEURL = LocalURL.serverURL + 'securityuser';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {

  oldpwd: string;
  newpwd: string;
  jsonData: Object;
  confirm_newpwd: string;
  constructor(private http: HttpClient,  private router: Router) { 
    
  }

  submitChangePwdRequest(){
    console.log("token: ", "shazi "+ localStorage.getItem('JWT-Token'));
    console.log("username",localStorage.getItem('currUserName'));
    let headers = { headers: new HttpHeaders({ "Authorization": "shazi "+ localStorage.getItem('JWT-Token')})}
    this.http.post(BSEURL + "/settings" 
      ,{"username":localStorage.getItem('currUserName'),"password":this.oldpwd,"newpassword":this.newpwd},
        headers )
      .subscribe(res=>{
        this.getFirstData(res)});
  }

  getFirstData(returnedObj: any){
    alert(returnedObj.msg);
    if(returnedObj.status==200){
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }
  
}
