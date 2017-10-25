import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { AppRoutingModule, routingComponents } from './app.routing'; 
import {FormsModule}from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http'; 
import {Http, Headers} from '@angular/http';
import{HomeComponent} from './components/home/home';
import{signupComponent} from './components/signup/signup.component';
import{ItemComponent} from './components/item/item.component';
import{LoginComponent} from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent,
   signupComponent,
   ItemComponent,
   LoginComponent,
   routingComponents

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
