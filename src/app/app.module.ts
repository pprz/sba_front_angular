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
    HttpClientModule
  ],
  providers: [BaseServiceService,
    {provide:HTTP_INTERCEPTORS,useClass:ParamInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
