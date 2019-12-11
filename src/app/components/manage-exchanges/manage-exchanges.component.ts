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
  stockExchange: string;
  exchangeForm = new Exchange();
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
      // error => this.errMsg = error
      error => {
        this.errMsg = error;
        alert(error);
      }
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
          // this.exchanges.push();
          this.exchanges.push(this.exchange);
          alert (res.msg);
          this.getExchanges();
          this.exchange = new Exchange();
        } else {
          alert (res.msg);
          this.getExchanges();
          this.exchange = new Exchange();
        }
      },
      error => {
        this.errMsg = error;
        alert(error);
      }
    );
  }

  currentExchange(i: number) {
    this.exchangesService.getCurrentExchange(this.exchanges[i].exchangeid)
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          this.exchangeForm = res.data;
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

  update() {
    // id = this.exchange.exchangeid;
    // console.log(typeof(i), i);
    // console.log('this.exchangeForm', this.exchangeForm); // undefined
    this.exchangesService.updateExchange(this.exchangeForm)
    .subscribe(
      res => {
        if (res.status === 200) {
          console.log('response', res);
          // console.log('slice', this.exchanges.slice(this.exchangeForm.exchangeid));
          // this.exchangeForm.splice(this.exchangeForm.exchangeid , 1, this.exchangeForm);
          alert (res.msg);
          this.getExchanges();
          this.exchangeForm = new Exchange();
        } else {
          alert (res.msg);
          this.getExchanges();
          this.exchangeForm = new Exchange();
        }
      },
      error => {
        this.errMsg = error;
        alert(error);
      }
    );
  }
}
