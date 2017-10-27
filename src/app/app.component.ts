import { OnInit,Component ,NgModule} from '@angular/core';
import{Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
//import { NgModule} from '@angular/core'
//import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router'
//...................................................
import  { HttpHeaders } from '@angular/common/http';
import  {HomeComponent} from './components/home/home';
import {LoginComponent} from './components/login/login.component';
import{signupComponent} from './components/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']


})
export class AppComponent{
  name : String;
  password : String
  constructor(public http: Http) {
    
      }

      // const routes = [ 
      //   {
      //   path: '', 
      //   component: LoginComponent
      // },{
      //   path: 'log',
      //   component: LoginComponent
      // },{
      //   path:'sup/:id',
      //   component: signupComponent
      // },{
      //   path: '**', redirectTo:''
      // }]
     
      send() {
        const that = this;
       console.log(that)
        this.http.post('http://localhost:4500/app',{
          username: that.name,
          password: that.password
        })
        // JSON.stringify({
        //   username: that.name,
        //   password: that.password
        // })
      .subscribe(
        data => {
          alert('ok');
          console.log(data)
        },
        error => {
          console.log(error , "erooooooooooooooooooe");
        }
        )

}
    //   send() {
    //     console.log(this.password)
    //  this.http.get('http://localhost:3000/user')
    // .map(res => res.json())
    // .subscribe(
    //   data =>{
    //     console.log(data)
    //   },
    //   err => console.log(err),
    //   () => console.log("khawa" )
    // );
    
    //     }

}