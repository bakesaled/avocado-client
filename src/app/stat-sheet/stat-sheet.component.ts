import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../core/api.service';
import { GameState } from '../core/classes/game-state';

@Component({
  selector: 'avocado-stat-sheet',
  templateUrl: './stat-sheet.component.html',
  styleUrls: ['./stat-sheet.component.scss']
})
export class StatSheetComponent implements OnInit {
  private gameStateSubscription: Subscription;

  public population: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.gameStateSubscription = this.apiService.getGameState().subscribe((gameState: GameState) => {
      console.log('got population', gameState);

      this.population = gameState.playerStats.population;
    });
  }

}
