import { OnInit, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']


})
export class LoginComponent {
  name: String;
  password: String;

  classres: Object

  constructor(public http: Http, private router: Router) {


  }

  login() {
    const that = this;

    console.log(this.name);

    this.http.post('http://127.0.0.1:4500/login', {
      username: that.name,
      password: that.password
    })
      .subscribe(
      data => {

        console.log("------------------>data is ", data.json()[0])
        if (data.json()[0] === undefined) {
          alert('notttttttttttttttttttttttok');
          //this.router.navigate(['/signup']);
        }

        if (data.json()[0].username === that.name) {
          alert('ok');
          this.router.navigate(['/home']);
        }
      },

      error => {
        alert('not here ...............');
        //console.log(error , "erorr in login ");
        this.router.navigate(['/signup']);
      }
      )
  }
}