import { Component, OnInit,OnDestroy } from '@angular/core';
import { ChatRoomService } from './chatRoom.service';
import { Subject } from 'rxjs/Subject';
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
   constructor(private ChatRoomService:ChatRoomService) {}
  send(){
    this.ChatRoomService.send(this.chat,this.name);
    this.chat = '';
     this.name = '';
    this.color = ['green','red','yellow','black','blue']
    this.x =this.color[Math.floor((Math.random() * 5) )]
    //console.log(this.color[this.x]);
    this.newColor = "color: "+this.x;
    console.log(this.newColor)
   this.chats= this.ChatRoomService.chats
  }
  ngOnInit() {
    this.connection = this.ChatRoomService.get()
     
  }
  // Let's unsubscribe our Observable
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
