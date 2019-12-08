import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ScrollableTabComponent,
  HomeComponent,
  LoginComponent,
  SignupComponent,
  ImportExcelComponent,
  ManageCompaniesComponent,
  ManageIPOComponent,
  ManageExchangesComponent,
  UserIpoComponent,
  CompareCompanyComponent,
  CompareSectorsComponent,
  HomeDetailComponent,
  OtherComponent
} from './components';

import { FormsModule } from '@angular/forms';
import { BaseServiceService } from './service';
import { ParamInterceptor } from './interceptors/params.interceptor';

// Fusion chart start
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as Powercharts from 'fusioncharts/fusioncharts.powercharts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// 按上面的顺序
FusionChartsModule.fcRoot(FusionCharts, Charts, Powercharts, FusionTheme);
// Fusion chart End
// File upload start
import { FileUploadModule } from 'ng2-file-upload';
// File upload end
// 模拟数据服务器 start
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './components/manage-exchanges/in-memory-data.service';
// 模拟数据服务器 end
@NgModule({
  declarations: [
    AppComponent,
    ScrollableTabComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ImportExcelComponent,
    ManageCompaniesComponent,
    ManageIPOComponent,
    ManageExchangesComponent,
    UserIpoComponent,
    CompareCompanyComponent,
    CompareSectorsComponent,
    HomeDetailComponent,
    OtherComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // HttpModule,
    FusionChartsModule,
    FileUploadModule
  ],
  providers: [
    BaseServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: ParamInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
