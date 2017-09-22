import { CoordinateTile } from './coordinate-tile';
import { Vehicle } from './vehicle';

export class GameState {
  constructor(
    public streets: Array<CoordinateTile>,
    public vehicles: Array<Vehicle>
  ) {}
}
