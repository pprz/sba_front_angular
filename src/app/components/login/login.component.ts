import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 路由传参用到
import { Login } from './login';
import { LoginService } from '../login/login.service';
import { GlobalService } from '../../service/global.service';
import { Authresponse } from '../../service/authresponse';
// import { ActivatedRoute, Params } from '@angular/router'; // 获取路由传参用到

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login = new Login();
  // login: Login = {
  //   username: '',
  //   password: ''
  // };
  submitted = false;
  pageMessage = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    // private globalService: GlobalService, 时 {{ globalService.pageMessage }} 不识别
    public globalService: GlobalService,
    public authresponse: Authresponse
    // private activateInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    // a部署时需要注掉
    // this.login.username = 'Liker';
    // this.login.password = '111111';
    // console.log('username::', this.login.username, 'pw::', this.login.password);
    this.pageMessage = '';
  }

  onSignin() {
    this.submitted = true;
    console.log('onSubmit() done!');
    this.loginService.findUser(this.login).subscribe(
      res => {
        // console.log('data::', res); // memory测试用
        // this.redirect(res); // memory测试用
        console.log('data::', res.data);
        this.redirect(res.data);
      }, // success path
      error => this.pageMessage = error // error path
    );
  }

  // direct to different page according to user type(role)
  redirect(data: any) {
    if (data == null) {
      this.pageMessage = 'Please signup or recheck your password!';
      console.log(this.pageMessage);
      return;
    }
    this.globalService.userId = data.id;
    this.globalService.userRole = data.usertype;
    this.globalService.userName = data.username;

    localStorage.setItem('JWT-Token', data.jwtToken);
    localStorage.setItem('currUserRole', data.usertype);
    localStorage.setItem('currUserName', data.username);
    this.authresponse.name = data.username;
    this.authresponse.role = data.usertype;
    this.authresponse.token = data.jwtToken;

    console.log(this.globalService.userId);
    console.log(this.globalService.userRole);
    if ('ROLE_admin' === data.usertype) {
      console.log(data.usertype);
      console.log(data.id);
      this.router.navigateByUrl('/home/importExcel');
    } else if ('ROLE_user' === data.usertype) {
      console.log(data.usertype);
      console.log(data.id);
      this.router.navigateByUrl('/home/IPOs');
    } else {
      console.log(data.usertype);
      console.log(data.id);
      this.router.navigateByUrl('/errorpage');
    }
  }

}
