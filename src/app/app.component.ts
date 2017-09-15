import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { GameService } from './core/game.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'avocado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public playerName: string;

  constructor(public auth: AuthService, private gameService: GameService) {
    auth.handleAuthentication();
    gameService.connect(io);
    gameService.getPlayerInfo().subscribe((name: string) => {
      console.log('player name', name);
      this.playerName = name;
    })
  }
}
