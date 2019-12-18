import { Component, OnInit } from '@angular/core';
import {IPO} from './ipo';
import { ManageIpoService } from './manage-ipo.service';
declare let laydate;
@Component({
  selector: 'app-manage-ipo',
  templateUrl: './manage-ipo.component.html',
  styleUrls: ['./manage-ipo.component.scss']
})
export class ManageIPOComponent implements OnInit {
  ipos: IPO[];
  errMsg: any;
  ipoForm = new IPO();
  constructor(private manageipoService: ManageIpoService) { }

  ngOnInit() {
    this.getIpos();
    laydate.render({
      elem: '#opendatetime',
      type: 'datetime',
      theme: '#4DC6FD'
    });
  }
  getIpos() {
    this.manageipoService.getIPOs()
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          this.ipos = res.data;
        } else {
          alert (res.msg);
        }
      },
      // error => this.errMsg = error
      error => {
        this.errMsg = error;
        alert(error);
      }
    );
  }

  currentIpo(i: number) {
    this.manageipoService.getCurrentIpo(this.ipos[i].ipoid)
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          this.ipoForm = res.data;
        } else {
          alert (res.msg);
        }
      },
      error => {
        this.errMsg = error;
        alert(error);
      }
    );
  }

  updateipo() {
    this.manageipoService.updateIpo(this.ipoForm)
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          alert (res.msg);
          this.getIpos();
          this.ipoForm = new IPO();
        } else {
          alert (res.msg);
          this.getIpos();
          this.ipoForm = new IPO();
        }
      },
      error => {
        this.errMsg = error;
        alert(error);
      }
    );
  }
}
