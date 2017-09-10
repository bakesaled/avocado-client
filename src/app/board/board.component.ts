import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'avocado-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private tileSetImages: Array<HTMLImageElement>;
  private context: CanvasRenderingContext2D;
  private eastWestRoadSegment: Tile;
  private northSouthRoadSegment: Tile;
  private intersectionRoadSegment: Tile;
  private tiles: Array<Tile>;
  private allImagesLoaded: boolean;
  private imageLoadCount: number = 0;

  private lightsContext: CanvasRenderingContext2D;
  
  @ViewChild('board') canvasRef: ElementRef;
  @ViewChild('lights') lightsCanvasRef: ElementRef;

  constructor() {
    const clover = {
      id: 0,
      x: 0,
      y: 0,
      width: 1024,
      height: 1024
    };
    this.eastWestRoadSegment = {
      id: 1,
      x: 0,
      y: 0,
      width: 256,
      height: 256
    };
    this.northSouthRoadSegment = {
      id: 2,
      x: 0,
      y: 0,
      width: 256,
      height: 256
    };
    this.intersectionRoadSegment = {
      id: 3,
      x: 0,
      y: 0,
      width: 256,
      height: 256
    };
    const trafficLight = {
      id: 0,
      x: 1,
      y: 113,
      width: 414,
      height: 414
    };

    this.tiles = [
      clover,
      this.eastWestRoadSegment,
      this.northSouthRoadSegment,
      this.intersectionRoadSegment,
      trafficLight
    ];
  }

  ngOnInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.loadTileSetImage();
  }

  clear() {

  }

  loadTileSetImage() {
    const basePath = '../../assets/';

    const clover = new Image();
    clover.src = basePath + 'textures/clover.jpg';
    clover.onload = () => this.drawBoard();

    const roadEW = new Image();
    roadEW.src = basePath + 'roads/roadEW.png';
    roadEW.onload = () => this.drawBoard();

    const roadNS = new Image();
    roadNS.src = basePath + 'roads/roadNS.png';
    roadNS.onload = () => this.drawBoard();

    const roadNEWS = new Image();
    roadNEWS.src = basePath + 'roads/roadNEWS.png';
    roadNEWS.onload = () => this.drawBoard();

    const trafficLight = new Image();
    trafficLight.src = basePath + 'traffic-light.png';
    trafficLight.onload = () => this.drawBoard();

    this.tileSetImages = [
      clover,
      roadEW,
      roadNS,
      roadNEWS,
      trafficLight
    ];

    // this.tileSetImage = new Image();
    // this.tileSetImage.src = '../../assets/Road_test.png';
    // this.tileSetImage.onload = () => this.drawBoard();
  }

  drawBoard() {
    this.imageLoadCount++;
    this.allImagesLoaded = this.imageLoadCount === this.tileSetImages.length;

    if (!this.allImagesLoaded) {
      return;
    }
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
        const tile = map[r][c];

          let tileSetCell = this.tiles[tile]
          this.context.drawImage(this.tileSetImages[tile], tileSetCell.x, tileSetCell.y, tileSetCell.width, tileSetCell.height, (c * tileSize), (r * tileSize), tileSize, tileSize);

          // draw light
          if (tile === 3) {
            tileSetCell = this.tiles[4]
            this.context.drawImage(this.tileSetImages[4], tileSetCell.x, tileSetCell.y, tileSetCell.width, tileSetCell.height, ((c * tileSize) + 0), ((r * tileSize) + 32), 16, 16);
          }
      }
    }


  }
}

interface Tile {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
