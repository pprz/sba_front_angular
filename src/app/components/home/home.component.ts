import { Component, OnInit } from '@angular/core';
import { TopMenu } from '../scrollable-tab';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  topMenus:TopMenu[]=[{title:'Import Data',link:''},{title:'Manage Company',link:''},
  {title:'Manage Exchange',link:''},{title:'Update IPO details',link:''},
  {title:'IPOs',link:''},{title:'Compare Company',link:''},
  {title:'Compare Sectors',link:''},{title:'other',link:''},                 
 ]    
hadleTapSelected(topMenu:TopMenu){
console.log(topMenu)
}   

}
