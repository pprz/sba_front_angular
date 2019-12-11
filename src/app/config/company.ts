export class Company {
  companyid: number;
  companyCode: string;
  companyName: string;
  turnover: number;
  ceo: string;
  boardofdirectors: string;
  listedinskex: string;
  sectorName: string;
  brifewriteup: string;
  stockCode: string;
  companyStatus: string;
}

export class IpoDetails {
  companyName: string;
  stockExchange: string;
  pricePerShare: number;
  totalNumber: number;
  listedinskex: string;
  openDateTime: Date;
  IpoRemarks: string;
}
export class CompanyIPO {
  company: Company;
  ipo: IpoDetails;
}
