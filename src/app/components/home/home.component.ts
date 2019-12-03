import { Component, OnInit } from '@angular/core';
import { TopMenu } from '../scrollable-tab';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }



  topMenus:TopMenu[]=[
  {title:'Import Data',link:'importExcel',id:1},
  {title:'Manage Company',link:'manageCompanies',id:2},
  {title:'Manage Exchange',link:'manageExchanges',id:3},
  {title:'Update IPO details',link:'manageIPO',id:4},
  {title:'IPOs',link:'IPOs',id:5},
  {title:'Compare Company',link:'compareCompany',id:6},
  {title:'Compare Sectors',link:'compareSectors',id:7},
  {title:'other',link:'other',id:8},                 
 ]    
hadleTapSelected(topMenu:TopMenu){
this.router.navigate(['home',topMenu.link])
}   

}
