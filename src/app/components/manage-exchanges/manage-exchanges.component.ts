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

  constructor(private exchangesService: ExchangesService) { }

  ngOnInit() {
    this.getExchanges();
  }

  getExchanges(): void {
    this.exchangesService.getExchanges()
    .subscribe(exchanges => this.exchanges = exchanges);
  }

}
