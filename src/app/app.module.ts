import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule, routingComponents } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/*****************************************************************************************************/
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { signupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home';
import { MapComponent } from './components/map/map.components';
import { LoginComponent } from './components/login/login.component';
import { MaintenanceComponent } from './components/maintenance/maintenance';
import { OthersComponent } from './components/others/others';
import { ToolsComponent } from './components/tools/tools'
import { FernutureComponent } from './components/fernuture/fernuture';
import { ClothesComponent } from './components/clothes/clothes';
/*****************************************************************************************************/
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    signupComponent,
    ItemComponent,
    MapComponent,
    LoginComponent,
    ToolsComponent,
    MaintenanceComponent,
    OthersComponent,
    FileSelectDirective,
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
/*****************************************************************************************************/
export class AppModule { }
