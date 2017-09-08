import { Injectable } from '@angular/core';
// import Socket = SocketIO.Socket;
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
// import Socket = SocketIOClient.Socket;


@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket;

  constructor() { }

  public sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }

  public getMessages() {
    const obserable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('chat message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return obserable;
  }
}
