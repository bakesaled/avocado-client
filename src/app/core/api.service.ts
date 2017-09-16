import { Observable } from 'rxjs/Observable';
import { Board } from './classes/board';

export class ApiService {
  private url = 'http://localhost:3000';
  public socket: SocketIOClient.Socket;

  public connect(io) {
    this.socket = io(this.url);
    this.createNewPlayer();
  }

  public createNewPlayer() {
    this.socket.emit('new player', 'jock', 'my image');
  }

  public getPlayerInfo() {
    const obserable = new Observable(observer => {
      this.socket.on('new player info', (name: string) => {
        observer.next(name);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return obserable;
  }

  public getBoardInfo() {
    const obserable = new Observable(observer => {
      this.socket.on('board info', (board: Board) => {
        observer.next(board);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return obserable;
  }
}
