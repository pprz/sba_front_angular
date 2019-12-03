import { Component, OnInit } from '@angular/core';
import { TopMenu } from '../scrollable-tab';
import { Router } from '@angular/router';
import { BaseServiceService } from 'src/app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private service:BaseServiceService) { }

  ngOnInit() {
    console.log(this.service.getTabs())
    this.topMenus=this.service.getTabs()
    this.service.getSomeData().subscribe(res=>{
      console.log('res',res)
    })
  }



  topMenus:TopMenu[]=[]    
hadleTapSelected(topMenu:TopMenu){
this.router.navigate(['home',topMenu.link])
}   

}
