import { CoordinateTile } from './coordinate-tile';

export class GameState {
  constructor(
    public streets: Array<CoordinateTile>
  ) {}
}
