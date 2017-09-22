import { Coordinate } from './coordinate';
import { Tile } from './tile';

export class CoordinateTile {
  constructor(
    public coordinate: Coordinate,
    public tile: Tile
  ) {}
}

