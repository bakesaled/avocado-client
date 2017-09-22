import { Coordinate } from './coordinate';
import { Direction } from './direction';

export class Vehicle {
  constructor(
    public id: number,
    public direction: Direction,
    public coordinate: Coordinate
  ) {}
}
