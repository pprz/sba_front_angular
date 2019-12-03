import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';



export interface TopMenu{
  id:Number,
  title:String,
  link?:String,

}
@Component({
  selector: 'app-scrollable-tab',
  templateUrl: './scrollable-tab.component.html',
  styleUrls: ['./scrollable-tab.component.scss']
})



export class ScrollableTabComponent implements OnInit,OnChanges {

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges){

  }
  selectedIndex:Number=0
  @Input() menus:TopMenu[]=[]
  @Input() bColor='#fff'
  @Input() titleActiveColor='yellow'
  @Input() titleColor='blue'
  @Input() indicatorColor='brown'
  @Output() tabSelected=new EventEmitter()
  handleSelection(index:number)  {
    this.selectedIndex=index
    this.tabSelected.emit(this.menus[index])
  }  

}
