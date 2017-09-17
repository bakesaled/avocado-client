import { Layer } from './layer';

export class Board {
  constructor(public backgroundLayer: Layer, public trafficLayer: Layer) {}
}
