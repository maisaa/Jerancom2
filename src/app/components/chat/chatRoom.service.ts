import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
export class ChatRoomService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:4500'; 
  socket;
  chats = [];
   send(message,name){
     //console.log("frontend",message)

    this.socket.emit('giveChat', [message,name]); 

  }
   get() {
      this.socket = io(this.url);
      this.socket.on('newChat', (data) => {
        console.log("data----------------",data) 
      this.chats.push(data);
      console.log("///////////",this.chats[0])
      });
      return () => {
        this.socket.disconnect();
      }; 

  } 
}