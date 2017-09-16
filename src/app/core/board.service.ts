import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GameService } from './game.service';

@Injectable()
export class BoardService {
  private socket: SocketIOClient.Socket;

  constructor(private gameService: GameService) { }

  public getBoardInfo() {
    const obserable = new Observable(observer => {
      this.socket = this.gameService.socket;
      this.socket.on('board info', (board: any) => {
        observer.next(board);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return obserable;
  }
}
