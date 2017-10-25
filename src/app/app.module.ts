import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http'; 
import {Http, Headers} from '@angular/http';
import{HomeComponent} from './components/home/home';
import{signupComponent} from './components/signup/signup.component';
import{ItemComponent} from './components/item/item.component';
import{FileSelectDirective} from 'ng2-file-upload';
// import { FileSelectDirective } from 'ng2-file-upload';
import{MapComponent} from './components/map/map.components';
//import{AgmCoreModule} from 'angular2-google-maps/core';
import { AgmCoreModule } from '@agm/core';
import{ReactiveFormsModule} from '@angular/forms';


import{LoginComponent} from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent,
   signupComponent,
   ItemComponent,
   FileSelectDirective,
   
  MapComponent,
    LoginComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      
      apiKey: "AIzaSyAaprvcVNVDbJGy7YTZ3OUVCl4c0KvrhTc",
      libraries: ["places"]})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
