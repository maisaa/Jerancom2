import { Component, OnInit,OnDestroy } from '@angular/core';
import { ChatRoomService } from './chatRoom.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
@Component({
  selector: 'chat-app',
  templateUrl: './chatRoom.component.html',
  styleUrls: ['./chatRoom.scss'],
  providers: [ChatRoomService]
})
export class chatRoomComponent implements OnInit, OnDestroy {
  chats = [];
  connection;
  chat;
  name;
  color = [];
  x;
  newColor;
   constructor(private http: Http, private ChatRoomService:ChatRoomService ) {}
  send(){
    this.ChatRoomService.send(this.chat,this.name);
    this.chat = '';
    this.name = '';
  //   this.http.get('http://localhost:4500/prof')
  //   .map(res => res.json())
  //   .subscribe(
  //   data => {
  //    //  this.item = data;
  //    //  this.owner=data[0].user_id;
  //    //  this.longitude=data[0].longitude;
  //     //this.latitude=data[0].latitude;
  //     console.log("here is the .............................",data)
  //     console.log("username ",data[0].username);
  //  //   this.name = data[0].username
  //     //data[0].username
  //    //console.log(".................",this.ses)
  
  //  // this.socket.emit('giveChat', [message,  name]);
  //   },
  //   err => console.log("eeeeeeeeeeeeeeeerrrrrrrror",err),
  //   () => console.log("here is the item ")
  //   );
 
  
    this.color = ['green','red','yellow','black','blue']
    this.x =this.color[Math.floor((Math.random() * 5) )]
    //console.log(this.color[this.x]);
    this.newColor = "color: "+this.x;
    console.log(this.newColor)
  // this.chats= this.ChatRoomService.chats
  // console.log("chaaaats from com",this.chats)
   //this.chats[1] = this.name
  }

  ngOnInit() {
    this.http.get('https://jerancoma.herokuapp.com/prof')
    .map(res => res.json())
    .subscribe(
    data => {
     //  this.item = data;
     //  this.owner=data[0].user_id;
     //  this.longitude=data[0].longitude;
      //this.latitude=data[0].latitude;
      console.log("here is the .............................",data)
      console.log("username ",data[0].username);
     this.name = data[0].username
    },
    err => console.log("eeeeeeeeeeeeeeeerrrrrrrror",err),
    () => console.log("here is the item ")
    );
    this.connection = this.ChatRoomService.get().subscribe(message => {
     // console.log("chaaaaaaaaaaarsss",this.chat)
      this.chats.push(message);
      console.log("mmmmmmmmmmm",message)
    
    })
    
  }
  // Let's unsubscribe our Observable
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
 
}
