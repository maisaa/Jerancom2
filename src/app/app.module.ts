import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http'; 
import {Http, Headers} from '@angular/http';
import{HomeComponent} from './components/home/home';
 

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
