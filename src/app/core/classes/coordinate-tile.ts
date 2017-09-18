import { Coordinate } from './coordinate';
import { Tile } from './tile';

export class CoordinateTile {
  constructor(
    public coord: Coordinate,
    public tile: Tile
  ) {}
}

