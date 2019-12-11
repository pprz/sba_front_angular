import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../service/company-service.service';
import { Company } from '../../config/company';
import { IpoDetails } from '../../config/company';
import { CompanyIPO } from '../../config/company';

declare let laydate;
@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.scss']
})
export class ManageCompaniesComponent implements OnInit {
  companies: Company[];
  errMsg: any;
  company = new Company();
  companyipo = new CompanyIPO();
  companyForm = new Company();
  ipodetails = new IpoDetails();
  public search:any = '';
  constructor(private companyservice: CompanyServiceService ) { }

  ngOnInit() {
    this.getCompanies();
    laydate.render({
      elem: '#openDateTime',
      type: 'datetime',
      theme: '#4DC6FD'
    });
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
    // error => this.errMsg = error
    error => {
      this.errMsg = error;
      alert(error);
    }
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
    error => {
      this.errMsg = error;
      alert(error);
    }
  );
}
addall() {
  console.log('this.company', this.company);
  this.companyipo.company = this.company;
  this.companyipo.ipo = this.ipodetails;
  this.companyservice.addCompanyIpo(this.companyipo)
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
    error => {
      this.errMsg = error;
      alert(error);
    }
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
    error => {
      this.errMsg = error;
      alert(error);
    }
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
    error => {
      this.errMsg = error;
      alert(error);
    }
  );
}



}
