import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { LocalURL } from '../../config/global-config';


const BSEURL = LocalURL.serverURL + 'searchsector';
const SECONDARYURL_FIRSTCHART = "/search/comparison/";
const SECONDARYURL_SECONDCHART = "/search/comparison/companyAnd/";

const COMPANYURL = BSEURL+SECONDARYURL_FIRSTCHART;
const SECTORURL = BSEURL+SECONDARYURL_SECONDCHART;

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.scss']
})
export class CompareCompanyComponent implements OnInit {
    rangeValue: number = 60;
    average: number = 0;

    // form part
    companyOrSector: string="company";
    bseOrNse: string="bse";
    companyOrSector_name: string; //500112

    companyOrsector_second: string="company";
    bseOrNse_second: string="bse";
    companyOrSector_second_name: string; //Catering
    
    startTime: string;
    endTime: string;

    // first chart
    firstChartType: string;
    firstChart : Object;
    firstChart_dataList:any[]=[];

    // second chart
    secondChartType: string;
    secondChart : Object;
    secondChart_dataList:any[]=[];

    // merged part
    mergedChartType: string;
    mergedChart : Object;
    merged_dataList_first:any[]=[];
    merged_dataList_second:any[]=[];
    merged_catagoryList:any[]=[];

  constructor(private http: HttpClient) {
    //第一张图的数据部分
    this.firstChartType = "line";
    this.firstChart = {
        "chart": {
            "lineThickness": "2",
            "theme": "fusion"
        },
        "data": this.firstChart_dataList
        
    };

    //第二张图
    this.secondChartType = "line";
    this.secondChart = {
        "chart": {
            "lineThickness": "2",
            "theme": "fusion"
        },
        "data": this.secondChart_dataList
        
    };

    // Merge图的数据部分
    this.mergedChartType = "msline";
    this.merged_catagoryList
    this.mergedChart = {
        "chart": {
            "xAxisName": "Day",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": this.merged_catagoryList
            }
        ],
        "dataset": [
            {
                "seriesname": this.companyOrSector_name,
                "data": this.merged_dataList_first
            },
            {
                "seriesname": this.companyOrSector_second_name,
                "data": this.merged_dataList_second
            }
         ],
    };
  } // end of constructor

    ngOnInit() {
    }

    getDatas() {
        //只有一个form
        if(this.companyOrSector_second_name==""||this.companyOrSector_second_name==null){

            if(this.companyOrSector_name==""||this.companyOrSector_name==null){
                alert("please input information")
            }else {

            // alert("only one form");
            this.getFirstChartData();
            console.log("form 1 -  c or s: " , this.companyOrSector, "bse or nse: ", this.bseOrNse, "companyor sector name: ", this.companyOrSector_name);
                    
            document.getElementById("chartRow").style.display='block';
            document.getElementById("chart1").style.display='block'
            document.getElementById("chart2").style.display='none';
            document.getElementById("chart3").style.display='none';
            document.getElementById("mergeButton").style.display='none';
            }
            
        }else{
            this.getFirstChartData();
            this.getSecondChartData();
            console.log("form 1 -  c or s: " , this.companyOrSector, "bse or nse: ", this.bseOrNse, "companyor sector name: ", this.companyOrSector_name);
            console.log("form 2 -  c or s: " , this.companyOrsector_second, "bse or nse: ", this.bseOrNse_second, "companyor sector name: ", this.companyOrSector_second_name);
            
            document.getElementById("chartRow").style.display='block';
            document.getElementById("chart1").style.display='block'
            document.getElementById("chart2").style.display='block';
            document.getElementById("chart3").style.display='none';
            document.getElementById("mergeButton").style.display='block';

        }

    }
    add(){
        document.getElementById("secondForm").style.display='block';
        document.getElementById("addbutton").style.display='none';
        document.getElementById("removebutton").style.display='block';
    }

    remove(){
        document.getElementById("addbutton").style.display='block';
        document.getElementById("removebutton").style.display='none';
        document.getElementById("secondForm").style.display='none';
        document.getElementById("chart3").style.display='none';
        document.getElementById("chart2").style.display='none';
    }
    // Single company chart 
    getFirstChartData(){
        this.http.post(COMPANYURL + this.companyOrSector_name,{start:'2019-06-08 10:30:00',end:'2019-06-09 10:30:00'} ).subscribe(res=>{
            
            this.getFirstData(res)});
    }
    getFirstData(returnedObj: any){
      console.log("res: " , returnedObj)
      console.log("res size: ", returnedObj.data.length)
        if(returnedObj.status!=200){
            alert("Service is unavailible! ")
        }else {
            if(returnedObj.data.length==0){
                alert("no data, please search again")
            }else {
                this.firstChart_dataList.splice(0,this.firstChart_dataList.length);
                this.merged_dataList_first.splice(0,this.merged_dataList_first.length);
                this.merged_catagoryList.splice(0,this.merged_catagoryList.length);
            returnedObj.data.forEach(element => {
                console.log("first data", this.firstChart_dataList)
                // 遍历返回的data数组, 按fusion的格式封装值
                this.firstChart_dataList.push({
                    "label": element.dateTime,
                    "value": element.currentPrice
                })

                this.merged_dataList_first.push({
                    "value": element.currentPrice
                })

                this.merged_catagoryList.push({
                    "label": element.dateTime,
                })
            });}
        }
  }

  // Single company chart 
  getSecondChartData(){
    this.http.post(SECTORURL+this.companyOrSector_second_name,{start:'2019-06-08 10:30:00',end:'2019-06-09 10:30:00'} ).subscribe(res=>{
    this.getSecondData(res)});
  }
  getSecondData(returnedObj: any){
      console.log("res: " , returnedObj)
    //   if(returnedObj.data.length==0){
    //     alert("no data, please search again")
    //   }else {
        this.secondChart_dataList.splice(0,this.secondChart_dataList.length);
        this.merged_dataList_second.splice(0,this.merged_dataList_second.length);
        returnedObj.data.forEach(element => {
            // 遍历返回的data数组, 按fusion的格式封装值
            
            this.secondChart_dataList.push({
                "label": element.label,
                "value": element.value
            })
            
            this.merged_dataList_second.push({
                "value": element.value
            })
        });
  }

changeCompanyorSector(index){
    this.companyOrSector=index;
}
changeBseOrNse(index){
    this.bseOrNse=index;
}
//second part
changeSecondBseOrNse(index){
    this.bseOrNse_second=index;
}
changeSecondCompanyorSector(index){
    this.companyOrsector_second=index;
}
mergeChartsToOneChart(){
    document.getElementById("chart1").style.display='none'
    document.getElementById("chart2").style.display='none';
    document.getElementById("chart3").style.display='block';
}
}
