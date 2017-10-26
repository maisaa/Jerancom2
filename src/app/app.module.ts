import { BrowserModule } from '@angular/platform-browser';

import {Component, NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { AppRoutingModule, routingComponents } from './app.routing'; 
import {FormsModule}from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { HomeComponent } from './components/home/home';
import { signupComponent } from './components/signup/signup.component';
import { ItemComponent } from './components/item/item.component';
import { FileSelectDirective } from 'ng2-file-upload';
// import { FileSelectDirective } from 'ng2-file-upload';
import { MapComponent } from './components/map/map.components';
//import{AgmCoreModule} from 'angular2-google-maps/core';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToolsComponent } from './components/tools/tools'
import { LoginComponent } from './components/login/login.component';
import {FernutureComponent} from './components/fernuture/fernuture';
import{ClothesComponent} from './components/clothes/clothes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    signupComponent,
    ItemComponent,
    FileSelectDirective,
    MapComponent,
    LoginComponent,
    ToolsComponent,
    routingComponents,
    FernutureComponent,
    ClothesComponent
      


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AppRoutingModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({

      apiKey: "AIzaSyAaprvcVNVDbJGy7YTZ3OUVCl4c0KvrhTc",
      libraries: ["places"]
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
