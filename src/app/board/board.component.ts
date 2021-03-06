import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../core/image.service';
import { Img } from '../core/classes/img';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../core/api.service';
import { Board } from '../core/classes/board';
import { Layer } from '../core/classes/layer';
import { Tile } from '../core/classes/tile';
import { Coordinate } from '../core/classes/coordinate';
import { GameState } from '../core/classes/game-state';
import { CoordinateTile } from '../core/classes/coordinate-tile';
import { Vehicle } from '../core/classes/vehicle';
import { Direction } from '../core/classes/direction';

@Component({
  selector: 'avocado-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  private context: CanvasRenderingContext2D;
  private trafficContext: CanvasRenderingContext2D;
  private boardSubscription: Subscription;
  private gameStateSubscription: Subscription;
  private readonly tileSize: number = 64;
  
  @ViewChild('backgroundCanvas') backgroundCanvasRef: ElementRef;
  @ViewChild('trafficCanvas') trafficCanvasRef: ElementRef;

  public board: Board;

  constructor(private imageService: ImageService, private apiService: ApiService) {

  }

  ngOnInit() {
    this.context = this.backgroundCanvasRef.nativeElement.getContext('2d');
    this.trafficContext = this.trafficCanvasRef.nativeElement.getContext('2d');

    this.boardSubscription = this.apiService.getBoardInfo().subscribe((board: Board) => {
      console.log('got boards', board);
      this.board = board;
      this.createBoard();
    });

    this.gameStateSubscription = this.apiService.getGameState().subscribe((gameState: GameState) => {
      console.log('got game state', gameState);

      //TODO: Update board
      gameState.streets.forEach((street) => {
        this.drawStreet(street);
      });

      this.clearTraffic();
      gameState.vehicles.forEach((vehicle) => {
        this.drawVehicle(vehicle);
      });
    });
  }

  ngOnDestroy() {
    this.boardSubscription.unsubscribe();
    this.gameStateSubscription.unsubscribe();
  }

  public handleDrop(event: Event) {
    console.log('drop successful');
  }

  public drawStreet(street: CoordinateTile) {
    const img: Img = this.imageService.images.find(i => i.id === 1);
    this.drawSquare(this.context, street.coordinate, img);
  }

  private clearTraffic() {
    this.trafficContext.clearRect(0, 0, this.trafficCanvasRef.nativeElement.width, this.trafficCanvasRef.nativeElement.height)
  }

  private drawSquare(context: CanvasRenderingContext2D, coordinate: Coordinate, img: Img) {
    const x = coordinate.x * this.tileSize;
    const y = coordinate.y * this.tileSize;
    const htmlImage = this.imageService.htmlImages.find(i => i.name === img.name);

    context.drawImage(htmlImage, img.x, img.y, img.width, img.height, x, y, this.tileSize, this.tileSize);
  }

  private createBoard() {
    console.log('creating boards');
    this.initLayer(this.board.backgroundLayer);
    this.initLayer(this.board.trafficLayer);

    this.backgroundCanvasRef.nativeElement.height = this.board.backgroundLayer.rows * this.tileSize;
    this.backgroundCanvasRef.nativeElement.width = this.board.backgroundLayer.columns * this.tileSize;

    this.trafficCanvasRef.nativeElement.height = this.board.trafficLayer.rows * this.tileSize;
    this.trafficCanvasRef.nativeElement.width = this.board.trafficLayer.columns * this.tileSize;
  }

  private initLayer(layer: Layer) {
    layer.tiles = new Array(layer.rows);

    for (let i = 0; i < layer.rows; i++) {
      layer.tiles[i] = new Array(layer.columns);
      for (let j = 0; j < layer.columns; j++) {
        layer.tiles[i][j] = new Tile();
      }
    }
  }

  clear() {

  }

  drawBoard(htmlImages: Array<HTMLImageElement>) {
    var map = [
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,1,1,3,1,1,1,3,1,1,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    const tileSize = 64;
    const rowTileCount = map.length;
    const colTileCount = map[0].length;
    for (let r = 0; r < rowTileCount; r++) {
      for (let c = 0; c < colTileCount; c++) {
        const tile: number = map[r][c];
        const img: Img = this.imageService.images.find(i => i.id === tile);
        const htmlImage = htmlImages.find(i => i.name === img.name);
        this.context.drawImage(htmlImage, img.x, img.y, img.width, img.height, (c * tileSize), (r * tileSize), tileSize, tileSize);

        // draw light
        if (tile === 3) {
          this.drawLights(htmlImages, c ,r, tileSize);
        }
      }
    }
  }

  private drawLights(htmlImages: Array<HTMLImageElement>, c: number, r: number, tileSize: number) {
    const img: Img = this.imageService.images.find(i => i.name === 'traffic-light-red');
    const htmlImage = htmlImages.find(i => i.name === img.name);
    this.trafficContext.drawImage(htmlImage, img.x, img.y, img.width, img.height, ((c * tileSize) + 0), ((r * tileSize) + 32), 16, 16);
  }

  public drawVehicle(vehicle: Vehicle) {
    let img: Img;
    switch (vehicle.direction) {
      case Direction.Up:
        img = this.imageService.images.find(i => i.id === 5);
        break;
      case Direction.Down:
        img = this.imageService.images.find(i => i.id === 6);
        break;
      case Direction.Left:
        img = this.imageService.images.find(i => i.id === 7);
        break;
      case Direction.Right:
        img = this.imageService.images.find(i => i.id === 8);
        break;
    }
    this.drawSquare(this.trafficContext, vehicle.coordinate, img);
  }
}
