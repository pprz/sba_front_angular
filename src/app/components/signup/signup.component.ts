import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from './signup';
import { SignupService } from '../signup/signup.service';
import { GlobalService } from '../../service/global.service';
import { Authresponse } from '../../service/authresponse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signup = new Signup();
  submitted = false;
  pageMessage = '';

  constructor(
    private router: Router,
    private signupService: SignupService,
    public globalService: GlobalService,
    public authresponse: Authresponse
  ) { }

  ngOnInit() {
    this.pageMessage = '';
  }

  onSignup() {
    this.submitted = true;
    console.log('onSubmit() done!');
    this.signupService.addUser(this.signup).subscribe(
      res => {
        // this.pageMessage = res.msg;
        // console.log('message', this.pageMessage);
        console.log('message', res.msg);
        this.globalService.infoMessage = res.msg;
        if (res.status === 200) {
          this.router.navigateByUrl('/login');
        } else {
          this.router.navigateByUrl('/signup');
        }
      },
      error => {
        this.pageMessage = error;
      }
    );
  }

}

