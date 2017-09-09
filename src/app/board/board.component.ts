import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'avocado-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private tileSetImage: HTMLImageElement;
  private roadTileSetImages: Array<HTMLImageElement>;
  private context: CanvasRenderingContext2D;
  private eastWestRoadSegment: RoadSegment;
  private northSouthRoadSegment: RoadSegment;
  private intersectionRoadSegment: RoadSegment;
  private roadSegs: Array<RoadSegment>;
  private allImagesLoaded: boolean;
  private imageLoadCount: number = 0;
  
  @ViewChild('board') canvasRef: ElementRef;

  constructor() {
    this.eastWestRoadSegment = {
      id: 1,
      x: 0,
      y: 0,
      width: 256,
      height: 256
    }
    this.northSouthRoadSegment = {
      id: 2,
      x: 0,
      y: 0,
      width: 256,
      height: 256
    }
    this.intersectionRoadSegment = {
      id: 3,
      x: 0,
      y: 0,
      width: 256,
      height: 256
    }

    this.roadSegs = [
      this.eastWestRoadSegment,
      this.northSouthRoadSegment,
      this.intersectionRoadSegment
    ];
  }

  ngOnInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.loadTileSetImage();
  }

  clear() {

  }

  loadTileSetImage() {
    const basePath = '../../assets/roads/';

    const roadEW = new Image();
    roadEW.src = basePath + 'roadEW.png';
    roadEW.onload = () => this.drawBoard();

    const roadNS = new Image();
    roadNS.src = basePath + 'roadNS.png';
    roadNS.onload = () => this.drawBoard();

    const roadNEWS = new Image();
    roadNEWS.src = basePath + 'roadNEWS.png';
    roadNEWS.onload = () => this.drawBoard();

    this.roadTileSetImages = [
      roadEW,
      roadNS,
      roadNEWS
    ];

    // this.tileSetImage = new Image();
    // this.tileSetImage.src = '../../assets/Road_test.png';
    // this.tileSetImage.onload = () => this.drawBoard();
  }

  drawBoard() {
    this.imageLoadCount++;
    this.allImagesLoaded = this.imageLoadCount === 3;

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
        if (tile > 0) {
          const tileSetCell = this.roadSegs[tile - 1]
          this.context.drawImage(this.roadTileSetImages[tile - 1], tileSetCell.x, tileSetCell.y, tileSetCell.width, tileSetCell.height, (c * tileSize), (r * tileSize), tileSize, tileSize);
        }
      }
    }
  }
}

interface RoadSegment {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
