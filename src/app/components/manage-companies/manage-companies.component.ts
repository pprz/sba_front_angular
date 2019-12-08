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
  companyForm = new Company();
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
        alert (res.msg);
      }
    },
    error => this.errMsg = error
    );
}
add() {
  console.log('this.company', this.company);
  this.companyservice.addCompany(this.company)
  .subscribe(
    res => {
      if (res.status === 200) {
        console.log('response', res);
        // this.companys = res.data;
        // this.companys.push();
        this.companies.push(this.company);
        alert (res.msg);
        this.getCompanies();
        this.company = new Company();
      } else {
        alert (res.msg);
        this.getCompanies();
        this.company = new Company();
      }
    },
    error => this.errMsg = error
  );
}
update() {
  // id = this.exchange.exchangeid;
  // console.log(typeof(i), i);
  // console.log('this.companyForm', this.companyForm); // undefined
  this.companyservice.updateCompany(this.companyForm)
  .subscribe(
    res => {
      if (res.status === 200) {
        console.log('response', res);
        console.log('slice', this.companies.slice(this.companyForm.companyid));
        // this.companyForm.splice(this.companyForm.exchangeid , 1, this.companyForm);
        alert (res.msg);
        this.getCompanies();
        this.companyForm = new Company();
      } else {
        alert (res.msg);
        this.getCompanies();
        this.companyForm = new Company();
      }
    },
    error => this.errMsg = error
  );
}
currentCompany(i: number) {
  this.companyservice.getCurrentCompany(this.companies[i].companyid)
  .subscribe(
    res => {
      if (res.status === 200) {
        console.log('response', res);
        this.companyForm = res.data;
      } else {
        alert (res.msg);
      }
    },
    error => this.errMsg = error
  );
}



}
