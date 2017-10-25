import { OnInit, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']


})
export class signupComponent {
  name: String;
  password: String;
  phone: Number;
  constructor(public http: Http, private router: Router) {

  }

  submit() {
    const that = this;
    console.log(that)
    this.http.post('http://127.0.0.1:4500/signup', {
      username: that.name,
      password: that.password,
      phone: that.phone

    })

      .subscribe(
      data => {
        alert('SingUp correctly');
        console.log(data)
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error, "erooooooooooooooooooe");
      }
      )

  }
}