import { OnInit, Component, ElementRef, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//import * as ng from '@angular/core';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import { FileSelectDirective } from 'ng2-file-upload';
const URL = ' http://localhost:4500/upload';

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent {
    // filesToUpload: Array<File>;
    // myfile:any;
    // file:any;
    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    //This is the default title property created by the angular cli. Its responsible for the app works 
    //title = 'app works!';
picture:String;
    ngOnInit() {
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        //overide the onCompleteItem property of the uploader so we are 
        //able to deal with the server response.
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.picture=response;
        };
    }
    constructor(private http: Http, private el: ElementRef) {
        // this.filesToUpload = [];
    }
    upload() {
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            formData.append('photo', inputEl.files.item(0));
            //call the angular http method
            this.http
                //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL, formData).map((res: Response) => res.json()).subscribe(
                //map the success function and alert the response
                (success) => {
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

        const that = this;
        console.log(that)
        this.http.post('http://localhost:4500/item', {
            itemname: that.name,
            price: that.price,
            info: that.info,
            itemtype: that.type,
            picture:that.picture
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
                console.log(error, "erooooooooooooooooooe");
            }
            )

    }
}



 // public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'})

  // ngOnInit() {
  //   //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
  //     this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
  //   //overide the onCompleteItem property of the uploader so we are 
  //   //able to deal with the server response.
  //     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
  //           console.log("ImageUpload:uploaded:", item, status, response);
  //       };
  //     }


  // ngOnInit() {
  //        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
  //        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
  //        //overide the onCompleteItem property of the uploader so we are
  //        //able to deal with the server response.
  //        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
  //             console.log("ImageUpload:uploaded:", item, status, response);
  //         }
  //       }

   ////
//    uploadfile(event) {
//     AWS.config.accessKeyId = 'YOUR-ACCESS-KEY';
//     AWS.config.secretAccessKey = 'YOU-SECRET-ACCESS-KEY';
//     var bucket = new AWS.S3({params: {Bucket: 'YOUR-BUCKET-NAME'}});
//     var params = {Key: this.file.name, Body: this.file};
//     bucket.upload(params, function (err, data) {
//         console.log(err, data);
//     });
// }


// fileEvent(fileInput: any){
//     var files = event.target.files;
//     var file = files[0];
//     this.file = file;
// }

// }
   ///
//       upload() {
//         this.makeFileRequest("http://localhost:4500/item", [], this.filesToUpload).then((result) => {
//             console.log("herrrrrrrrrrrrrrrrrr",result);
//         }, (error) => {
//             console.log('------------------')
//             console.error(error);
//         });
//     }

//     fileChangeEvent(fileInput: any){
//         this.filesToUpload = <Array<File>> fileInput.target.files;
//     }

//     makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
//         return new Promise((resolve, reject) => {
//             var formData: any = new FormData();
//             var xhr = new XMLHttpRequest();
//             for(var i = 0; i < files.length; i++) {
//                 formData.append("uploads[]", files[i], files[i].name);
//             }
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState == 4) {
//                     if (xhr.status == 200) {
//                         resolve(JSON.parse(xhr.response));
//                     } else {
//                         reject(xhr.response);
//                     }
//                 }
//             }
//             xhr.open("POST", url, true);
//             xhr.send(formData);
//         });
//     }

// }
// upload() {
//     this.us.makeFileRequest("http://localhost:4500/item", this.filesToUpload)
//     .then((result) => {
//         console.log(result);
//     }, (error) => {
//         console.error(error);
//     });
// }
// onFileChange(fileInput: any){
//     this.logo = fileInput.target.files[0];
// }
// }







