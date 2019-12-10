import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.scss']
})
export class CompareCompanyComponent implements OnInit {
    
    rangeValue: number = 60;
    // form part
    paramOfFirstChart: string;
    startTime: string;
    endTime: string;

    // first part
    firstPriceType: string;
    firstPriceFusion : Object;
    firstPriceFusion_dataList:any[]=[];

    // second part
    secondPriceType: string;
    secondPriceFusion : Object;
    secondPriceFusion_dataList:any[]=[];
    secondPriceFusion_catagoryList:any[]=[];

  constructor(private http: HttpClient) {
    //第一张图的数据部分
    this.paramOfFirstChart = "500112";
    this.firstPriceType = "line";
    this.firstPriceFusion = {
        "chart": {
            "caption": "Single Company chart",
            // "subCaption": "Last week",
            "lineThickness": "2",
            "theme": "fusion"
        },
        "data": this.firstPriceFusion_dataList
        
    };

    // 第二张图的数据部分
    this.paramOfFirstChart = "500112";
    this.secondPriceType = "msline";
    this.secondPriceFusion_catagoryList

    this.secondPriceFusion = {
        "chart": {
            "caption": "Number of visitors last week",
            "subCaption": "Bakersfield Central vs Los Angeles Topanga",
            "xAxisName": "Day",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": this.secondPriceFusion_catagoryList
                // [
                //     {
                //         "label": "Mon"
                //     },
                //     {
                //         "label": "Tue"
                //     },
                //     {
                //         "label": "Wed"
                //     },
                //     {
                //         "vline": "true",
                //         "lineposition": "0",
                //         "color": "#6baa01",
                //         "labelHAlign": "center",
                //         "labelPosition": "0",
                //         "label": "National holiday",
                //         "dashed": "1"
                //     },
                //     {
                //         "label": "Thu"
                //     },
                //     {
                //         "label": "Fri"
                //     },
                //     {
                //         "label": "Sat"
                //     },
                //     {
                //         "label": "Sun"
                //     }
                // ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Bakersfield Central",
                "data": this.secondPriceFusion_dataList
                // [
                //     {
                //         "value": "15123"
                //     },
                //     {
                //         "value": "14233"
                //     },
                //     {
                //         "value": "25507"
                //     },
                //     {
                //         "value": "9110"
                //     },
                //     {
                //         "value": "15529"
                //     },
                //     {
                //         "value": "20803"
                //     },
                //     {
                //         "value": "19202"
                //     }
                // ]
            },
            {
                "seriesname": "Los Angeles Topanga",
                "data": this.secondPriceFusion_dataList
                // [
                //     {
                //         "value": "13400"
                //     },
                //     {
                //         "value": "12800"
                //     },
                //     {
                //         "value": "22800"
                //     },
                //     {
                //         "value": "12400"
                //     },
                //     {
                //         "value": "15800"
                //     },
                //     {
                //         "value": "19800"
                //     },
                //     {
                //         "value": "21800"
                //     }
                // ]
            }
         ],
    };
  } // end of constructor
  ngOnInit() {
    
  }

  getDatas() {
    this.getFirstChartData();
    this.getSecondChartData();
  }

  // Single company chart 
  getFirstChartData(){
    this.http.post("http://localhost:8081/search/comparison/"+ this.paramOfFirstChart,{start:'2019-06-08 10:30:00',end:'2019-06-09 10:30:00'} ).subscribe(res=>{
    this.getFirstData(res)});
  }
  getFirstData(returnedObj: any){
      console.log("res: " , returnedObj)
        returnedObj.data.forEach(element => {
            // 遍历返回的data数组, 按fusion的格式封装值
            this.firstPriceFusion_dataList.push({
                "label": element.dateTime,
                "value": element.currentPrice
            })
        });
  }

  getSecondChartData(){
    this.http.post("http://localhost:8081/search/comparison/companyAnd/Catering",{start:'2019-06-08 10:30:00',end:'2019-06-09 10:30:00'} ).subscribe(res=>{
    this.getSecondData(res)

    });
  }
  getSecondData(returnedObj: any){
      console.log("res: " , returnedObj)
        returnedObj.data.forEach(element => {
            // 遍历返回的data数组, 按fusion的格式封装值
            this.secondPriceFusion_catagoryList.push({
                "label": element.lable,
            })

            this.secondPriceFusion_dataList.push({
                "value": element.value
            })
        });
  }






  

}
