import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from '../../config/company';

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.scss']
})
export class ManageCompaniesComponent implements OnInit {
  companies: Company[];
  errMsg: any;
  company = new Company();
  constructor(private companyservice: CompanyServiceService ) { }

  ngOnInit() {
    this.getCompanies();
}

getCompanies() {
  this.companyservice.getCompanies()
  .subscribe(
    res => {
      if (res.status === 200) {
        // console.log('response', response);
        this.companies = res.data;
      } else {
        // alert (response.msg);
      }
    },
    error => this.errMsg = error
    );
}
add() {}

}
