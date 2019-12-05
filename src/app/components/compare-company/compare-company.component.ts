import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../../message.service';

const response1 = Object;
@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.scss']
})
export class CompareCompanyComponent implements OnInit {
    
    // public response: any;
    anyList:Object;
    singleData: Object;
    multiData: Object;
    singleType: string;
    multiType: string;
    response1: any;
  constructor(private http: HttpClient) {

    this.singleType = "candlestick";
    this.multiType = "msspline";
    this.singleData = {
        "chart": {
            "caption": "Daily Stock Price HRYS",
            "subCaption": "Last 2 months",
            "numberprefix": "$",
            "vNumberPrefix": " ",
            "pyaxisname": "Price",
            "vyaxisname": "Volume (In Millions)",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "2 month ago",
                        "x": "1"
                    },
                    {
                        "label": "1 month ago",
                        "x": "31"
                    },
                    {
                        "label": "Today",
                        "x": "60"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "data": [
                    {
                        "open": "18.74",
                        "high": "19.16",
                        "low": "18.67 ",
                        "close": "18.99",
                        "x": "1",
                        "volume": "4991285"
                    },
                    {
                        "open": "18.74",
                        "high": "19.06",
                        "low": "18.54",
                        "close": "18.82",
                        "x": "2",
                        "volume": "3615889"
                    },
                    {
                        "open": "19.21",
                        "high": "19.3",
                        "low": "18.59 ",
                        "close": "18.65",
                        "x": "3",
                        "volume": "4749586"
                    },
                    {
                        "open": "19.85",
                        "high": "19.86",
                        "low": "19.12",
                        "close": "19.4",
                        "x": "4",
                        "volume": "4366740"
                    },
                    {
                        "open": "20.19",
                        "high": "20.21",
                        "low": "19.57",
                        "close": "19.92",
                        "x": "5",
                        "volume": "3982709"
                    },
                    {
                        "open": "20.47",
                        "high": "20.64",
                        "low": "20.15",
                        "close": "20.16",
                        "x": "6",
                        "volume": "2289403"
                    },
                    {
                        "open": "20.36",
                        "high": "20.52",
                        "low": "20.29",
                        "close": "20.48",
                        "x": "7",
                        "volume": "1950919"
                    },
                    {
                        "open": "20.21",
                        "high": "20.25",
                        "low": "19.91",
                        "close": "20.15",
                        "x": "8",
                        "volume": "2391070"
                    },
                    {
                        "open": "19.46",
                        "high": "20.54",
                        "low": "19.46",
                        "close": "20.22",
                        "x": "9",
                        "volume": "4548422"
                    },
                    {
                        "open": "19.24",
                        "high": "19.5",
                        "low": "19.13",
                        "close": "19.44",
                        "x": "10",
                        "volume": "1889811"
                    },
                    {
                        "open": "19.25",
                        "high": "19.41",
                        "low": "18.99",
                        "close": "19.22",
                        "x": "11",
                        "volume": "2543355"
                    },
                    {
                        "open": "18.85",
                        "high": "19.45",
                        "low": "18.8",
                        "close": "19.24",
                        "x": "12",
                        "volume": "2134393"
                    },
                    {
                        "open": "18.97",
                        "high": "19.01",
                        "low": "18.68",
                        "close": "18.95",
                        "x": "13",
                        "volume": "1740852"
                    },
                    {
                        "open": "18.69",
                        "high": "19",
                        "low": "18.35",
                        "close": "18.97",
                        "x": "14",
                        "volume": "2701392"
                    },
                    {
                        "open": "19.02",
                        "high": "19.1",
                        "low": "18.68",
                        "close": "18.7",
                        "x": "15",
                        "volume": "2198755"
                    },
                    {
                        "open": "19.29",
                        "high": "19.38",
                        "low": "18.88",
                        "close": "19.05",
                        "x": "16",
                        "volume": "2464958"
                    },
                    {
                        "open": "18.64",
                        "high": "19.35",
                        "low": "18.53",
                        "close": "19.33",
                        "x": "17",
                        "volume": "2962994"
                    },
                    {
                        "open": "18.14",
                        "high": "18.58",
                        "low": "18.08",
                        "close": "18.52",
                        "x": "18",
                        "volume": "1964932"
                    },
                    {
                        "open": "18.49",
                        "high": "18.92",
                        "low": "18.19",
                        "close": "18.26",
                        "x": "19",
                        "volume": "3013102"
                    },
                    {
                        "open": "18.71",
                        "high": "18.84",
                        "low": "18",
                        "close": "18.51",
                        "x": "20",
                        "volume": "4435894"
                    },
                    {
                        "open": "19.17",
                        "high": "19.35",
                        "low": "18.61",
                        "close": "18.66",
                        "x": "21",
                        "volume": "3245851"
                    },
                    {
                        "open": "19.12",
                        "high": "19.41",
                        "low": "18.92",
                        "close": "19.2",
                        "x": "22",
                        "volume": "2259792"
                    },
                    {
                        "open": "19.43",
                        "high": "19.58",
                        "low": "19.16",
                        "close": "19.33",
                        "x": "23",
                        "volume": "3531327"
                    },
                    {
                        "open": "19.72",
                        "high": "19.81",
                        "low": "19.04",
                        "close": "19.27",
                        "x": "24",
                        "volume": "5834733"
                    },
                    {
                        "open": "19.7",
                        "high": "19.94",
                        "low": "19.49",
                        "close": "19.77",
                        "x": "25",
                        "volume": "2009987"
                    },
                    {
                        "open": "19.84",
                        "high": "19.98",
                        "low": "19.39",
                        "close": "19.88",
                        "x": "26",
                        "volume": "2767592"
                    },
                    {
                        "open": "20.71",
                        "high": "20.73",
                        "low": "19.16",
                        "close": "19.63",
                        "x": "27",
                        "volume": "673358"
                    },
                    {
                        "open": "21.14",
                        "high": "21.14",
                        "low": "20.55",
                        "close": "20.65",
                        "x": "28",
                        "volume": "3164006"
                    },
                    {
                        "open": "21.5",
                        "high": "21.86",
                        "low": "21.2",
                        "close": "21.33",
                        "x": "29",
                        "volume": "7986466"
                    },
                    {
                        "open": "20.45",
                        "high": "21.08",
                        "low": "20.1",
                        "close": "20.56",
                        "x": "30",
                        "volume": "5813040"
                    },
                    {
                        "open": "20.07",
                        "high": "20.69",
                        "low": "20.04",
                        "close": "20.36",
                        "x": "31",
                        "volume": "3440002"
                    },
                    {
                        "open": "19.88",
                        "high": "20.11",
                        "low": "19.51",
                        "close": "20.03",
                        "x": "32",
                        "volume": "2779171"
                    },
                    {
                        "open": "19.76",
                        "high": "20.13",
                        "low": "19.65",
                        "close": "19.88",
                        "x": "33",
                        "volume": "2918115"
                    },
                    {
                        "open": "19.77",
                        "high": "19.97",
                        "low": "19.27",
                        "close": "19.9",
                        "x": "34",
                        "volume": "3850357"
                    },
                    {
                        "open": "19.43",
                        "high": "19.72",
                        "low": "18.88",
                        "close": "19.5",
                        "x": "35",
                        "volume": "5047378"
                    },
                    {
                        "open": "19.69",
                        "high": "19.84",
                        "low": "19.17",
                        "close": "19.43",
                        "x": "36",
                        "volume": "3479017"
                    },
                    {
                        "open": "19.59",
                        "high": "20.02",
                        "low": "19.02",
                        "close": "19.41",
                        "x": "37",
                        "volume": "5749874"
                    },
                    {
                        "open": "20.95",
                        "high": "21.09",
                        "low": "19.64",
                        "close": "19.83",
                        "x": "38",
                        "volume": "6319111"
                    },
                    {
                        "open": "20.52",
                        "high": "21.03",
                        "low": "20.45",
                        "close": "21",
                        "x": "39",
                        "volume": "4412413"
                    },
                    {
                        "open": "20.36",
                        "high": "20.96",
                        "low": "20.2",
                        "close": "20.44",
                        "x": "40",
                        "volume": "5948318"
                    },
                    {
                        "open": "21.45",
                        "high": "21.48",
                        "low": "19.63",
                        "close": "20.3",
                        "x": "41",
                        "volume": "11935440"
                    },
                    {
                        "open": "23.49",
                        "high": "23.57",
                        "low": "21.12",
                        "close": "21.63",
                        "x": "42",
                        "volume": "10523910"
                    },
                    {
                        "open": "24.04",
                        "high": "24.21",
                        "low": "23.04",
                        "close": "23.28",
                        "x": "43",
                        "volume": "3843797"
                    },
                    {
                        "open": "23.6",
                        "high": "24.065",
                        "low": "23.51",
                        "close": "23.94",
                        "x": "44",
                        "volume": "3691404"
                    },
                    {
                        "open": "22.87",
                        "high": "23.49",
                        "low": "22.86",
                        "close": "23.48",
                        "x": "45",
                        "volume": "3387393"
                    },
                    {
                        "open": "22.35",
                        "high": "22.89",
                        "low": "22.35",
                        "close": "22.74",
                        "x": "46",
                        "volume": "3737330"
                    },
                    {
                        "open": "22.11",
                        "high": "22.5",
                        "low": "21.9",
                        "close": "22.24",
                        "x": "47",
                        "volume": "4630397"
                    },
                    {
                        "open": "22.58",
                        "high": "22.80",
                        "low": "22.25",
                        "close": "22.42",
                        "x": "48",
                        "volume": "3024711"
                    },
                    {
                        "open": "23.54",
                        "high": "23.76",
                        "low": "22.6",
                        "close": "22.68",
                        "x": "49",
                        "volume": "3984508"
                    },
                    {
                        "open": "23.66",
                        "high": "24.09",
                        "low": "23.09",
                        "close": "23.46",
                        "x": "50",
                        "volume": "3420204"
                    },
                    {
                        "open": "24.36",
                        "high": "24.42",
                        "low": "22.90",
                        "close": "23.6",
                        "x": "51",
                        "volume": "5151096"
                    },
                    {
                        "open": "24.34",
                        "high": "24.6",
                        "low": "23.73",
                        "close": "24.15",
                        "x": "52",
                        "volume": "5999654"
                    },
                    {
                        "open": "23.38",
                        "high": "24.8",
                        "low": "23.36",
                        "close": "24.1",
                        "x": "53",
                        "volume": "5382049"
                    },
                    {
                        "open": "23.76",
                        "high": "23.84",
                        "low": "23.23",
                        "close": "23.47",
                        "x": "54",
                        "volume": "3508510"
                    },
                    {
                        "open": "23.64",
                        "high": "23.94",
                        "low": "23.48",
                        "close": "23.76",
                        "x": "55",
                        "volume": "2718428"
                    },
                    {
                        "open": "23.99",
                        "high": "24.18",
                        "low": "23.59",
                        "close": "23.66",
                        "x": "56",
                        "volume": "2859391"
                    },
                    {
                        "open": "23.32",
                        "high": "24.26",
                        "low": "23.32",
                        "close": "23.79",
                        "x": "57",
                        "volume": "4138618"
                    },
                    {
                        "open": "24.08",
                        "high": "24.4",
                        "low": "23.26",
                        "close": "23.39",
                        "x": "58",
                        "volume": "4477478"
                    },
                    {
                        "open": "22.84",
                        "high": "23.96",
                        "low": "22.83",
                        "close": "23.88",
                        "x": "59",
                        "volume": "4822378"
                    },
                    {
                        "open": "23.38",
                        "high": "23.78",
                        "low": "22.94",
                        "close": "23.01",
                        "x": "60",
                        "volume": "4037312"
                    },
                    {
                        "open": "23.97",
                        "high": "23.99",
                        "low": "23.14",
                        "close": "23.32",
                        "x": "61",
                        "volume": "4879546"
                    }
                ]
            }
        ]
    };
    this.multiData = {
        "chart": {
            "caption": "Number of visitors last week",
            "subCaption": "Bakersfield Central vs Los Angeles Topanga",
            "xAxisName": "Day",
            "yAxisName": "No. of Visitor",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Mon"
                    },
                    {
                        "label": "Tue"
                    },
                    {
                        "label": "Wed"
                    // },
                    // {
                    //     "vline": "true",
                    //     "lineposition": "0",
                    //     "color": "#6baa01",
                    //     "labelHAlign": "right",
                    //     "labelPosition": "0",
                    //     "label": "National holiday"
                    },
                    {
                        "label": "Thu"
                    },
                    {
                        "label": "Fri"
                    },
                    {
                        "label": "Sat"
                    },
                    {
                        "label": "Sun"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Bakersfield Central",
                "data": [
                    {
                        "value": "15123"
                    },
                    {
                        "value": "14233"
                    },
                    {
                        "value": "25507"
                    },
                    {
                        "value": "9110"
                    },
                    {
                        "value": "15529"
                    },
                    {
                        "value": "20803"
                    },
                    {
                        "value": "19202"
                    }
                ]
            },
            {
                "seriesname": "Los Angeles Topanga",
                "data": [
                    {
                        "value": "13400"
                    },
                    {
                        "value": "12800"
                    },
                    {
                        "value": "22800"
                    },
                    {
                        "value": "12400"
                    },
                    {
                        "value": "15800"
                    },
                    {
                        "value": "19800"
                    },
                    {
                        "value": "21800"
                    }
                ]
            }
        ]
    }; // end of this.dataSource
  } // end of constructor
  ngOnInit() {
    this.http.get("http://localhost:8088/getjson").subscribe(res=>{
        this.setData(res)});
  }

  setData(returnedObj: any){
    this.anyList = returnedObj;
    console.log("anyList: ", this.anyList)
  }



}
