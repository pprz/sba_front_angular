import { Component, OnInit } from '@angular/core';

import { HttpClient  } from '@angular/common/http';
import { LocalURL } from '../../config/global-config';


const BSEURL = LocalURL.serverURL + 'searchsector';
// const BSEURL = "http://localhost:8081"
const SECONDARYURL_SECTOR = "/search/comparison/sector/";

const SECTORURL = BSEURL+SECONDARYURL_SECTOR;

declare let laydate;

@Component({
  selector: 'app-compare-sectors',
  templateUrl: './compare-sectors.component.html',
  styleUrls: ['./compare-sectors.component.scss']
})

export class CompareSectorsComponent implements OnInit {

  // 状态位
  IS_SEC_FORM: boolean=false;
  IS_SPECIFIC_TIME: boolean;

  // 页面属性
  SECNAME_FIRST: string="";
  SECNAME_SECOND: string="";
  // 时间
  currentTime: Date;
  currentTime_str: string;
  startTime:string="";
  endTime:string="";

  // 数据
  sectorChart1: object;
  sectorChart1_data: any[]=[];

  sectorChart2: object;
  sectorChart2_data: any[]=[];

  mergeChart: object;
  mergeChart_Catagory: any[]=[];
  mergeChart_data1: any[]=[];
  mergeChart_data2: any[]=[];

  constructor(private http: HttpClient) {
    this.sectorChart1 = {
      "chart": {
          "lineThickness": "2",
          "theme": "fusion"
      },
      "data": this.sectorChart1_data
      
    };
    this.sectorChart2 = {
      "chart": {
          "lineThickness": "2",
          "theme": "fusion"
      },
      "data": this.sectorChart2_data
      
    };
    this.mergeChart = {
      "chart": {
          "xAxisName": "Day",
          "theme": "fusion"
      },
      "categories": [
          {
              "category": this.mergeChart_Catagory
          }
      ],
      "dataset": [
          {
              "seriesname": this.SECNAME_FIRST,
              "data": this.mergeChart_data1
          },
          {
              "seriesname": this.SECNAME_SECOND,
              "data": this.mergeChart_data2
          }
       ],
  };
  }// constuction finished


  // 页面事件
  add(){
    this.IS_SEC_FORM=true;
    document.getElementById("secondForm").style.display="block";
    document.getElementById("addbutton").style.display="none";
    document.getElementById("removebutton").style.display="block";
  }
  remove(){
    this.IS_SEC_FORM=false;
    document.getElementById("secondForm").style.display="none";
    document.getElementById("addbutton").style.display="block";
    document.getElementById("removebutton").style.display="none";
  }

  showChartsAndMergeButton(){
    document.getElementById("mergeButton").style.display="block";
    document.getElementById("comchart2").style.display="block";
    document.getElementById("mergeChart").style.display="block";

  }

  changeTime(index){
    console.log("事件类型", index)
    if(index=="indicate"){
      document.getElementById("indicateDiv").style.display="block";
      document.getElementById("selectTimeDiv").style.display="none";
    }else{
      document.getElementById("indicateDiv").style.display="none";
      document.getElementById("selectTimeDiv").style.display="block";
    }
  }

  selectperiod(index){
    this.currentTime=new Date();
    if(index=="last3"){
      this.startTime=this.TimeFormater(this.currentTime,3);
      this.endTime=this.TimeFormater(this.currentTime,0);
    }
    if(index=="last5"){
      this.startTime=this.TimeFormater(this.currentTime,5);
      this.endTime=this.TimeFormater(this.currentTime,0);
    }
    if(index=="last10"){
      this.startTime=this.TimeFormater(this.currentTime,10);
      this.endTime=this.TimeFormater(this.currentTime,0);
    }
  }

  TimeFormater(time: Date, lastDays:number){
    let day:number;
    let sourceDay:number=time.getDate();
    if(sourceDay<lastDays){
      day = 30-(lastDays-sourceDay);
    }else {
      day = sourceDay-lastDays
    }

    if (day<10) {
      return time.getFullYear()+"-"
    +(time.getMonth()+1)+"-0"
    +day+" "
    +"00:00:00";
    }

    console.log("day: ", day)
    return time.getFullYear()+"-"
    +(time.getMonth()+1)+"-"
    +day+" "
    +"00:00:00";
  }

  // 数据相关methods
  getCharts(){
    console.log("names : ", this.SECNAME_FIRST, this.SECNAME_SECOND, this.startTime, this.endTime);
    if (this.SECNAME_FIRST==""|| this.startTime==""||this.endTime=="") {
        alert("please input information");
        return;
    }

    if(this.IS_SEC_FORM){
      
      if (this.SECNAME_SECOND=="") {
        alert("please input information")
      }

      this.getChart1();
      this.getChart2();
      document.getElementById("mergeButton").style.display="block";

    }else{ 
      this.getChart1();
      document.getElementById("mergeButton").style.display="none";
    }
  }

  getChart1(){

    this.http.post(
      SECTORURL + this.SECNAME_FIRST,{start:this.startTime,end:this.endTime} )
          .subscribe((res:any)=>{
            this.sectorChart1_data.splice(0,this.sectorChart1_data.length);
            console.log("res data: ", res.data )
              res.data.forEach(element=>{
                this.sectorChart1_data.push({
                  "value":element.value,
                  "label":element.label
                })
              })
          });
      document.getElementById("comchart1").style.display="block";

  }
  getChart2(){
    this.http.post(
      SECTORURL + this.SECNAME_SECOND,{start:this.startTime,end:this.endTime} )
          .subscribe((res:any)=>{
            this.sectorChart2_data.splice(0,this.sectorChart2_data.length);
            console.log("res data: ", res.data )
              res.data.forEach(element=>{
                this.sectorChart2_data.push({
                  "value":element.value,
                  "label":element.label
                })
              })
          });
      document.getElementById("comchart2").style.display="block";

  }

  mergeCharts(){
    this.mergeChart_Catagory.splice(0,this.mergeChart_Catagory.length);
    this.mergeChart_data1.splice(0,this.mergeChart_data1.length);
    this.mergeChart_data2.splice(0,this.mergeChart_data2.length);

    this.sectorChart1_data.forEach(element=>{
      this.mergeChart_Catagory.push({
          "label": element.label,
      })

      this.mergeChart_data1.push({
          "value": element.value
      })
    })
    this.sectorChart2_data.forEach(element=>{
        this.mergeChart_data2.push({
            "value": element.value
        })
    })

    document.getElementById("comchart1").style.display="none";
    document.getElementById("comchart2").style.display="none";
    document.getElementById("mergeChart").style.display="block";
  }

  ngOnInit() {
    laydate.render({
      elem: '#startTime',
      type: 'datetime',
      theme: '#4DC6FD',
      done: (value, date, endDate) => {
          this.startTime = value;
      }
  });
    laydate.render({
      elem: '#endTime',
      type: 'datetime',
      theme: '#4DC6FD',
      done: (value, date, endDate) => {
          this.endTime = value;
      }
      });
  }  
}
