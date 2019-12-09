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
    companyName: string;
    startTime: string;
    endTime: string;
    anyList: Object;
    arraytemp: [];
    arraytempStr: string;
    companySinglePriceData: Object;
    companySinglePriceType: string;
    companySinglePriceFusion : Object;
    companySinglePriceFusion_data : Object;
  constructor(private http: HttpClient) {
    //数据部分
    this.companyName = "500112";
    this.companySinglePriceType = "line";
    this.companySinglePriceFusion_data = [{
        "label": "Mon",
        "value": "15123"
    },
    {
        "label": "Tue",
        "value": "14233"
    },
    {
        "label": "Wed",
        "value": "23507"
    },
    {
        "label": "Thu",
        "value": "9110"
    },
    {
        "label": "Fri",
        "value": "15529"
    },
    {
        "label": "Sat",
        "value": "20803"
    },
    {
        "label": "Sun",
        "value": "19202"
    }];

    this.companySinglePriceFusion = {
        "chart": {
            "caption": "Single Company chart",
            "subCaption": "Last week",
            "lineThickness": "2",
            "theme": "fusion"
        },
        "data": this.companySinglePriceFusion_data
        
    };

 
  } // end of constructor
  ngOnInit() {
    this.http.post("http://localhost:8081/search/comparison/"+ this.companyName,{start:'2019-06-08 10:30:00',end:'2019-06-09 10:30:00'} ).subscribe(res=>{
        this.setData(res)});
  }

  setData(returnedObj: any){
    returnedObj.data.forEach(element => {
        console.log("element: ", element.currentPrice, ", datetime:", element.dateTime);
        
        this.arraytemp.push[this.arraytempStr];
        console.log("arraytemp: ", this.arraytemp);
    });
    
  }



  

}
