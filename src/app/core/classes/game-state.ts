import { CoordinateTile } from './coordinate-tile';
import { Vehicle } from './vehicle';
import { PlayerStats } from './player-stats';

export class GameState {
  constructor(
    public streets: Array<CoordinateTile>,
    public vehicles: Array<Vehicle>,
    public playerStats: PlayerStats
  ) {}
}
