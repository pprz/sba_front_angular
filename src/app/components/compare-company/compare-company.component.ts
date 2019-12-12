import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { LocalURL } from '../../config/global-config';


const BSEURL = LocalURL.serverURL + 'searchsector';
// const BSEURL = "http://localhost:8081"
const SECONDARYURL_COMPANY = "/search/comparison/";
const SECONDARYURL_SECTOR = "/search/comparison/sector/";
const SECONDARYURL_SECTORBYCOMPANY = "/search/comparison/sectorAndCompany/"

const COMPANYURL = BSEURL+SECONDARYURL_COMPANY;
// const SECTORURL = BSEURL+SECONDARYURL_SECTOR;
const SECTORBYCOMPANY = BSEURL+SECONDARYURL_SECTORBYCOMPANY;
declare let laydate;
@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.scss']
})
export class CompareCompanyComponent implements OnInit {
    rangeValue: number = 3;
    average: number = 0;

    // form 部分
    // 默认第一条为company
    COM_OR_SEC: string = "company";
    COMCODE_FIRST: string="";
    // 第二个form
    COMCODE_SECOND: string="";
    // 时间
    startTime:string="";
    endTime:string="";
    // 时间
    currentTime: Date;
    currentTime_str: string;

    // 状态位部分
    // 第一个form是否为sector
    IS_SEC_FORM: Boolean=false;
    IS_SELECT_TIMERANGE:Boolean=false;

    // 数据部分
    // Sector 查询
    sectorChart1: Object;
    sectorChart1_catagory: any[]=[];
    sectorChart1_data1: any[]=[];
    sectorChart1_data2: any[]=[];
    sectorChart2: Object;
    sectorChart2_catagory: any[]=[];
    sectorChart2_data1: any[]=[];
    sectorChart2_data2: any[]=[];

    // company 查询
    companyChart1: Object;
    companyChart1_data: any[]=[];
    companyChart2: Object;
    companyChart2_data: any[]=[];

    // company merge
    mergeChart: object;
    mergeChart_Catagory: any[]=[];
    mergeChart_data1: any[]=[];
    mergeChart_data2: any[]=[];

  constructor(private http: HttpClient) {

    // Chart组件部分
    this.sectorChart1 = {
        "chart": {
            "xAxisName": "Day",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": this.sectorChart1_catagory
            }
        ],
        "dataset": [
            {
                "seriesname": "company",
                "data": this.sectorChart1_data1
            },
            {
                "seriesname": "sector",
                "data": this.sectorChart1_data2
            }
         ],
    };
    this.sectorChart2 = {
        "chart": {
            "xAxisName": "Day",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": this.sectorChart2_catagory
            }
        ],
        "dataset": [
            {
                "seriesname": "company",
                "data": this.sectorChart2_data1
            },
            {
                "seriesname": "sector",
                "data": this.sectorChart2_data2
            }
         ],
    };

    this.companyChart1 = {
        "chart": {
            "lineThickness": "2",
            "theme": "fusion"
        },
        "data": this.companyChart1_data
        
    };
    this.companyChart2 = {
        "chart": {
            "lineThickness": "2",
            "theme": "fusion"
        },
        "data": this.companyChart2_data
        
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
                "seriesname": this.COMCODE_FIRST,
                "data": this.mergeChart_data1
            },
            {
                "seriesname": this.COMCODE_SECOND,
                "data": this.mergeChart_data2
            }
         ],
    };
  }// End of Construction

    // 页面事件 metheds
    changeCompanyorSector(index){
        
        this.COM_OR_SEC=index;
        if(index="company"){
            this.hideSectorDivs();
           
        }else {
            document.getElementById("comchart1").style.display="none";
            this.hideCompanyDivs();
        }
    }   
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
    showSectorDivs(){
        document.getElementById("secCharts").style.display="block";
        document.getElementById("secchart1").style.display="block";
        if(this.IS_SEC_FORM) {
            document.getElementById("secchart2").style.display="block";
        }else{
            document.getElementById("secchart2").style.display="none";
        }
    }
    hideSectorDivs(){
        document.getElementById("secCharts").style.display="none";
        document.getElementById("secchart1").style.display="none";
        document.getElementById("secchart2").style.display="none";
    }
    showCompanyDivs(){
        this.hideSectorDivs();
        document.getElementById("comchart1").style.display="block";
        if(this.IS_SEC_FORM){
            document.getElementById("comchart2").style.display="block";
            document.getElementById("mergeButton").style.display="block";
        }else{
            document.getElementById("comchart2").style.display="none";
            document.getElementById("mergeButton").style.display="none";
        }     
        document.getElementById("mergeChart").style.display="none";
        
    }
    hideCompanyDivs(){
        document.getElementById("comchart1").style.display="none";
        document.getElementById("comchart2").style.display="none";
        document.getElementById("mergeChart").style.display="none";
        document.getElementById("mergeButton").style.display="none";
    }
    changeTime(index){
        if(index=="indicate"){
          this.IS_SELECT_TIMERANGE=false;
          document.getElementById("indicateDiv").style.display="block";
          document.getElementById("selectTimeDiv").style.display="none";
        }else{
          this.IS_SELECT_TIMERANGE=true;
          document.getElementById("indicateDiv").style.display="none";
          document.getElementById("selectTimeDiv").style.display="block";
        }
      }
    
    selectperiod(index:number){
        this.currentTime=new Date();
        if(index==3){
            this.startTime=this.TimeFormater(this.currentTime,3);
            this.endTime=this.TimeFormater(this.currentTime,0);
        }
        if(index==5){
            this.startTime=this.TimeFormater(this.currentTime,5);
            this.endTime=this.TimeFormater(this.currentTime,0);
        }
        if(index==7){
            this.startTime=this.TimeFormater(this.currentTime,7);
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
    
        return time.getFullYear()+"-"
        +(time.getMonth()+1)+"-"
        +day+" "
        +"00:00:00";
      }

    // chart 数据相关
    getCharts(){
        
        if(this.IS_SELECT_TIMERANGE){
            this.selectperiod(this.rangeValue);
        }

        if(this.COM_OR_SEC=="sector"){
            this.showSectorDivs();
            this.hideCompanyDivs();
            // get dta
            this.getSectorCharts();
        }else {
            this.hideSectorDivs();
            this.showCompanyDivs();
            // get data
            this.getCompanyCharts();
        }
    }

    // sector 查询部分
    getSectorCharts(){
        if(this.COMCODE_FIRST==""||this.startTime==""||this.endTime==""){
            alert("please input information");
            console.log("company: ", this.COMCODE_FIRST, "time: ", this.startTime, this.endTime  )
            return;
        }
        console.log("company: ", this.COMCODE_FIRST, "time: ", this.startTime, this.endTime  )
        // 发送 post
        if(this.IS_SEC_FORM){
            this.getSectorChart1();
            this.getSectorChart2();
        }else{
            this.getSectorChart1();
        }
        
    } 

    getSectorChart1(){
        // 选择sector, 需要第二个form
        // company -> sector
        this.getSectorChart1_data();
    }

    getSectorChart1_data(){
        this.sectorChart1_data2.splice(0,this.sectorChart1_data2.length);
        this.sectorChart1_data1.splice(0,this.sectorChart1_data1.length);
        this.sectorChart1_catagory.splice(0,this.sectorChart1_catagory.length);

        this.http.post(
            COMPANYURL + this.COMCODE_FIRST,{start:this.startTime,end:this.endTime} )
                .subscribe(res=>{
                    this.getSectorChart1_data1_catagoryAndData1(res)
                });
    }

    getSectorChart1_data1_catagoryAndData1(returnedObj: any){
        if(returnedObj.status==200&&returnedObj.data.length>0){
           
            returnedObj.data.forEach(element => {
                // 遍历返回的data数组, 按fusion的格式封装值
                this.sectorChart1_catagory.push({
                    "label": element.dateTime
                    // "value": element.currentPrice
                })
                this.sectorChart1_data1.push({
                    "value": element.currentPrice
                })
            });
            this.http.post(
                SECTORBYCOMPANY + this.COMCODE_FIRST,{start:this.startTime,end:this.endTime} )
                    .subscribe(res=>{
                        this.getSectorChart1_data2(res);
                    });
           
        }else{
            alert("No data found, please input other codes")
        }
    }
    getSectorChart1_data2(returnedObj: any){
        
        returnedObj.data.forEach(element => {
            this.sectorChart1_data2.push({
                "value": element.value
            })
            
        })
    }


    // Chart2 
    getSectorChart2(){
        // 选择sector, 需要第二个form
        // company -> sector
        this.getSectorChart2_data();
    }

    getSectorChart2_data(){
        this.sectorChart2_data2.splice(0,this.sectorChart2_data2.length);
        this.sectorChart2_data1.splice(0,this.sectorChart2_data1.length);
        this.sectorChart2_catagory.splice(0,this.sectorChart2_catagory.length);

        this.http.post(
            COMPANYURL + this.COMCODE_SECOND,{start:this.startTime,end:this.endTime} )
                .subscribe(res=>{
                    this.getSectorChart2_data1_catagoryAndData1(res)
                });
    }

    getSectorChart2_data1_catagoryAndData1(returnedObj: any){
        if(returnedObj.status==200&&returnedObj.data.length>0){
           
            returnedObj.data.forEach(element => {
                // 遍历返回的data数组, 按fusion的格式封装值
                this.sectorChart2_catagory.push({
                    "label": element.dateTime
                    // "value": element.currentPrice
                })
                this.sectorChart2_data1.push({
                    "value": element.currentPrice
                })
            });
            this.http.post(
                SECTORBYCOMPANY + this.COMCODE_SECOND,{start:this.startTime,end:this.endTime} )
                    .subscribe(res=>{
                        this.getSectorChart2_data2(res);
                    });
           
        }else{
            alert("No Data found, please input other codes")
        }
    }
    getSectorChart2_data2(returnedObj: any){
        
        returnedObj.data.forEach(element => {
            this.sectorChart2_data2.push({
                "value": element.value
            })
            
        })
    }

    // company 查询部分
    getCompanyCharts(){
        if(this.COMCODE_FIRST==null||this.COMCODE_FIRST==""||this.startTime==""||this.endTime==""){
            alert("please input information");
            return;
        }

        this.companyChart1_data.splice(0,this.companyChart1_data.length);
        this.companyChart2_data.splice(0,this.companyChart2_data.length);

        if(this.IS_SEC_FORM){
            this.getCompanyChart1_data();
            this.getCompanyChart2_data();
        }else {
            this.getCompanyChart1_data();
        }

       
    }
    getCompanyChart1_data(){
        this.http.post(
            COMPANYURL + this.COMCODE_FIRST,{start:this.startTime,end:this.endTime} )
                .subscribe((res:any)=>{
                    if(res.status==200&&res.data.length>0){
                        res.data.forEach(element => {
                            this.companyChart1_data.push({
                                "label": element.dateTime,
                                "value": element.currentPrice
                            })
                        })
                    }
                });
    }
    getCompanyChart2_data(){
        this.http.post(
            COMPANYURL + this.COMCODE_SECOND,{start:this.startTime,end:this.endTime} )
                .subscribe((res:any)=>{
                    if(res.status==200&&res.data.length>0){
                        res.data.forEach(element => {
                            this.companyChart2_data.push({
                                "label": element.dateTime,
                                "value": element.currentPrice
                            })
                        })
                    }
                });
    }

    mergeCompanyData(){

        document.getElementById("comchart1").style.display="none";
        document.getElementById("comchart2").style.display="none";
        document.getElementById("mergeChart").style.display="block";
        document.getElementById("mergeButton").style.display="block";
        
        this.mergeChart_Catagory.splice(0,this.mergeChart_Catagory.length);
        this.mergeChart_data1.splice(0,this.mergeChart_data1.length);
        this.mergeChart_data2.splice(0,this.mergeChart_data2.length);

        this.companyChart1_data.forEach(element=>{
            this.mergeChart_Catagory.push({
                "label": element.label,
            })

            this.mergeChart_data1.push({
                "value": element.value
            })
        })
        this.companyChart2_data.forEach(element=>{
            this.mergeChart_data2.push({
                "value": element.value
            })
        })
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
