import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameService {
  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket;

  constructor() { }

  public connect(io) {
    this.socket = io(this.url);
    this.initializeSocketHandlers();
    this.socket.emit('new player', 'jock', 'my image');
  }

  private initializeSocketHandlers() {
    // this.socket.on('new player info', (name: string) => {
    //   console.log('player name', name);
    // })
  }

  public getPlayerInfo() {
    const obserable = new Observable(observer => {
      this.socket.on('new player info', (name: string) => {
        observer.next(name);
      });
      // return () => {
      //   this.socket.disconnect();
      // };
    });
    return obserable;
  }
}
