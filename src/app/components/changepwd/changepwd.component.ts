import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

const BSEURL = "http://localhost:8089";

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
  constructor(private http: HttpClient) { 
    
  }

  submitChangePwdRequest(){
    console.log("token: ", "shazi "+ localStorage.getItem('JWT-Token'));
    console.log("username",localStorage.getItem('currUser')[0]);
  }
  
  validateOldPWD(){
    let headers = { headers: new HttpHeaders({ "Authorization": "shazi "+ localStorage.getItem('JWT-Token')})}
    this.http.post(BSEURL + "/settings" 
      ,{"username":"KK","password":this.oldpwd,"newpassword":this.newpwd},
        headers )
      .subscribe(res=>{
        this.getFirstData(res)});
  }

  getFirstData(returnedObj: any){
    alert(returnedObj.msg);
  }

  ngOnInit() {
  }
  
}
