import { OnInit,Component } from '@angular/core';
import{Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']


})
export class signupComponent{
  name : String;
  password : String;
  phone : Number;
  constructor(public http: Http) {
    
      }
     
      submit() {
        const that = this;
       console.log(that)
        this.http.post('http://localhost:4500/user',{
          username: that.name,
          password: that.password,
          phone: that.phone
          
        })
        // JSON.stringify({
        //   username: that.name,
        //   password: that.password
        // })
      .subscribe(
        data => {
          alert('SingUp correctly');
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