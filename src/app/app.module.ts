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


@NgModule({
  declarations: [
    AppComponent,
   HomeComponent,
   signupComponent,
   ItemComponent,
   FileSelectDirective

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
