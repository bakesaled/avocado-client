import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../core/image.service';
import { Img } from '../core/classes/img';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../core/api.service';
import { Board } from '../core/classes/board';
import { Layer } from '../core/classes/layer';
import { Tile } from '../core/classes/tile';

@Component({
  selector: 'avocado-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  private context: CanvasRenderingContext2D;
  private lightsContext: CanvasRenderingContext2D;
  private imagesSubscription: Subscription;
  private boardSubscription: Subscription;
  
  @ViewChild('backgroundCanvas') backgroundCanvasRef: ElementRef;
  @ViewChild('trafficCanvas') trafficCanvasRef: ElementRef;

  public board: Board;

  constructor(private imageService: ImageService, private apiService: ApiService) {
    this.imagesSubscription = this.imageService.htmlImagesObs.subscribe((images) => this.drawBoard(images));
  }

  ngOnInit() {
    this.context = this.backgroundCanvasRef.nativeElement.getContext('2d');
    this.lightsContext = this.trafficCanvasRef.nativeElement.getContext('2d');

    this.boardSubscription = this.apiService.getBoardInfo().subscribe((board: Board) => {
      console.log('got boards', board);
      this.board = board;
      this.createBoard();
      this.imageService.load();
    });
  }

  ngOnDestroy() {
    this.imagesSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }

  public handleDrop(event: Event) {
    console.log('drop successful');
  }

  private createBoard() {
    console.log('creating boards');
    this.initLayer(this.board.backgroundLayer);
    this.initLayer(this.board.trafficLayer);
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
    this.lightsContext.drawImage(htmlImage, img.x, img.y, img.width, img.height, ((c * tileSize) + 0), ((r * tileSize) + 32), 16, 16);
  }
}
