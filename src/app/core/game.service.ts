import { Injectable } from '@angular/core';

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

  }
}
