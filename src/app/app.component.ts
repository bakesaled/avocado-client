import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import * as io from 'socket.io-client';
import { ApiService } from './core/api.service';

@Component({
  selector: 'avocado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public playerName: string;

  constructor(public auth: AuthService, private apiService: ApiService) {
    auth.handleAuthentication();
    apiService.connect(io);
    apiService.getPlayerInfo().subscribe((name: string) => {
      console.log('player name', name);
      this.playerName = name;
    });
  }
}
