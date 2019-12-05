import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ScrollableTabComponent,HomeComponent,LoginComponent,
  ImportExcelComponent,ManageCompaniesComponent,
  ManageIPOComponent,ManageExchangesComponent,
  UserIpoComponent,CompareCompanyComponent,CompareSectorsComponent
  ,HomeDetailComponent,OtherComponent} from './components';
import { BaseServiceService } from './service';
import { ParamInterceptor } from './interceptors/params.interceptor';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';

import { FileUploadModule } from 'ng2-file-upload';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts)

@NgModule({
  declarations: [
    AppComponent,
    ScrollableTabComponent,
    HomeComponent,
    LoginComponent,
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
    FusionChartsModule, // Include in imports
    FileUploadModule // upload file
  ],
  providers: [BaseServiceService,
    {provide:HTTP_INTERCEPTORS,useClass:ParamInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
