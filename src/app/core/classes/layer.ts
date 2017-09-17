import { Tile } from './tile';

export class Layer {
  public tiles: Array<Array<Tile>>;
  public get rowTiles() {
    return this.tiles
  }
  constructor(public columns: number, public rows: number) {
  }
}
