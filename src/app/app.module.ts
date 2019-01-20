import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { CommonService } from './services/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginService } from './services/login.service';
import { AppContainerComponent } from './components/app-container/app-container.component';

@NgModule({
  declarations : [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent,
    RegisterPageComponent,
    AppContainerComponent
  ],
  imports : [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  providers : [
    CommonService,
    LoginService,
    { provide : LocationStrategy, useClass : HashLocationStrategy } ],
  bootstrap : [ AppComponent ]
})
export class AppModule {
}
