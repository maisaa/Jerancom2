import { OnInit, Component, ElementRef, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//import * as ng from '@angular/core';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

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
    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    //This is the default title property created by the angular cli. Its responsible for the app works 
    //title = 'app works!';
picture:String;
item=[];
owner:number;
//latitude: number;
longitude: number;
constructor(private http: Http, private el: ElementRef,private router: Router) {}
    
    ngOnInit() {
       
        
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        //overide the onCompleteItem property of the uploader so we are 
        //able to deal with the server response.
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.picture=response;
        };

        this.http.get('http://localhost:4500/prof')
        .map(res => res.json())
        .subscribe(
        data => {
          this.item = data;
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
    
    upload() {
        console.log('uploading')
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        console.log(inputEl)
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        console.log(fileCount)
        //create a new fromdata instance
        let formData = new FormData();
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            console.log('inside')
            formData.append('photo', inputEl.files.item(0));
            //call the angular http method
            this.http
                //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL, formData).map((res: Response) => res.json()).subscribe(
                //map the success function and alert the response
                (success) => {
                    console.log('yahoooooo')
                    alert(success._body);
                },
                (error) => alert(error))
        }
    }
    name: String;
    type: String;
    price: Number;
    info: String;
    
    submit() {
console.log("oooooooooooooooooooooooooooooooowwwwwwwwwww",this.owner)
        const that = this;
        console.log(that)
        this.http.post('http://localhost:4500/item', {
            itemname: that.name,
            price: that.price,
            info: that.info,
            itemtype: that.type,
            picture:that.picture,
            owner:that.owner,
            owner_name:this.item[0].owner_name,
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









