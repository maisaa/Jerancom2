import { OnInit, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loginScreenAnimation', [
      state('invalid', style({})),
      state('unchecked', style({})),
      state('completed', style({ transform: 'translateX(150%)' })),
      transition('unchecked => invalid', animate(250, keyframes([
        style({ transform: 'translateX(-10%)' }),
        style({ transform: 'translateX(10%)' }),
        style({ transform: 'translateX(-10%)' }),
        style({ transform: 'translateX(10%)' })
      ]))),
      transition('unchecked => completed', animate('1250ms 1s ease-out'))
    ])
  ]


})
export class LoginComponent {
  name: String;
  password: String;

  classres: Object
  loginScreenAnimation: string = 'unchecked';
  constructor(public http: Http, private router: Router) {

  }
  //*********************************************************/
  login() {
    const that = this;

    console.log(this.name);

    this.http.post('http://localhost:4500/login', {
      username: that.name,
      password: that.password
    })
      .subscribe(
      data => {

        console.log("------------------>data is ", data.json()[0])
        if (data.json()[0] === undefined) {
          // alert('notttttttttttttttttttttttok');
          //this.router.navigate(['/signup']);
          this.loginScreenAnimation = 'invalid';

        }

        if (data.json()[0].username === that.name) {
          this.loginScreenAnimation = 'completed';

          // alert('ok');
          this.router.navigate(['/home']);
        }
      },

      error => {
        alert('not here ...............');
        //console.log(error , "erorr in login ");
        // this.router.navigate(['/signup']);
      }
      )
  }
  setBackToUnchecked() {
    if (this.loginScreenAnimation === 'invalid') {
      this.loginScreenAnimation = 'unchecked';
    }
  }
  newAcount() {

    // this.router.navigate(['/signup']);

  }
}