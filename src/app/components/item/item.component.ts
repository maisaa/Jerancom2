import { OnInit, Component, ElementRef, Input } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
//import * as ng from '@angular/core';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Router } from '@angular/router';
//import { FileSelectDirective } from 'ng2-file-upload';
const URL = ' http://localhost:4500/upload';

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    // filesToUpload: Array<File>;
    // myfile:any;
    // file:any;
    //public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    //This is the default title property created by the angular cli. Its responsible for the app works 
    //title = 'app works!';
picture:String;
item=[];
owner:number;
owner_name:String;
//latitude: number;
longitude: number;
constructor(private http: Http, private el: ElementRef,private router: Router) {}
    
    ngOnInit() {
       
        
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        // //overide the onCompleteItem property of the uploader so we are 
        // //able to deal with the server response.
        // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //     console.log("ImageUpload:uploaded:", item, status, response);
        //     this.picture=response;
        // };

        this.http.get('http://localhost:4500/prof')
        .map(res => res.json())
        .subscribe(
        data => {
          this.item = data;
          this.owner_name= data[0].username
          this.owner=data[0].user_id;
          this.longitude=data[0].longitude;
          //this.latitude=data[0].latitude;
          console.log("here is the .............................",data)
          console.log("username ",data[0].username);

        },
        err => console.log("eeeeeeeeeeeeeeeerrrrrrrror",err),
        () => console.log("here is the item ")
        );
        
    }
      // this.filesToUpload = [];
      name: String;
      type: String;
      price: Number;
      info: String;
      filestring: string;
      files: FileList;
    upload() {
        const that = this
        let body = JSON.stringify( that.filestring );
        let headers = new Headers({ 'Content-Type': 'undefined'});
       headers.append('Authorization', `Client-ID a9a8040fbe41477`);
        let options = new RequestOptions({ headers: headers });
        
        this.http.post('https://api.imgur.com/3/image',body,options)
        .subscribe(
            data => {
                alert('whyyyyy');
                console.log(data.json().data.link,"thiiiiiis////////////////******")
                that.picture = data.json().data.link;
            },
            error => {
                console.log(error, "erooooooooooooooooooe");
            }
            )
    }
   
    getFile(event){
        this.files = event.target.files;
        console.log(event.target.files);
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.files[0]);
    }
 
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.filestring = btoa(binaryString);  // Converting binary string data.
     console.log(this.filestring);
   }
    
    submit() {

console.log("oooooooooooooooooooooooooooooooowwwwwwwwwww",this.owner_name)
        const that = this;
        console.log(that)
        console.log(that.picture);
       
        this.http.post('http://localhost:4500/item', {
            itemname: that.name,
            price: that.price,
            info: that.info,
            itemtype: that.type,
            picture:that.picture,
            owner:that.owner,
            owner_name:that.owner_name,
            longitude:that.longitude,
            latitude:that.item[0].latitude
            })
            // JSON.stringify({
            //   username: that.name,
            //   password: that.password
            // })
            .subscribe(
            data => {
                alert('ok');
                this.router.navigate(['/home']);
                console.log(data)
            },
            error => {
                console.log(error, "erooooooooooooooooooe");
            }
            )

    }
    // getuser(){
    //     this.http.get('http://localhost:4500/prof')
    //     .map(res => res.json())
    //     .subscribe(
    //     data => {
    //     //   this.item = data;
    //       console.log(data)
    //     },
    //     err => console.log(err),
    //     () => console.log("here is the item ")
    //     );
    // }
}









