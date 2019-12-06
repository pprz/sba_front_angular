import { Component, OnInit } from '@angular/core';
import {Exchange} from './exchange';
import { ExchangesService } from './exchanges.service';
@Component({
  selector: 'app-manage-exchanges',
  templateUrl: './manage-exchanges.component.html',
  styleUrls: ['./manage-exchanges.component.scss']
})
export class ManageExchangesComponent implements OnInit {
  exchanges: Exchange[];
  errMsg: any;
  exchange = new Exchange();
  constructor(private exchangesService: ExchangesService) { }

  ngOnInit() {
    this.getExchanges();
  }

  getExchanges() {
    this.exchangesService.getExchanges()
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          this.exchanges = res.data;
        } else {
          alert (res.msg);
        }
      },
      error => this.errMsg = error
      // exchanges => {
      //   console.log('response', exchanges);
      //   this.exchanges = exchanges;
      // }
      );
  }

  add() {
    console.log('this.exchange', this.exchange);
    this.exchangesService.addExchange(this.exchange)
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          // this.exchanges = res.data;
          this.exchanges.push();
          alert (res.msg);
        } else {
          alert (res.msg);
        }
      },
      error => this.errMsg = error
    );
  }

}
