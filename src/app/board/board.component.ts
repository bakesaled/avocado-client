import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'avocado-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private tileSetImage: HTMLImageElement;
  private context: CanvasRenderingContext2D;
  private eastWestRoadSegment: RoadSegment;
  private northSouthRoadSegment: RoadSegment;
  private intersectionRoadSegment: RoadSegment;
  private roadSegs: Array<RoadSegment>;
  
  @ViewChild('board') canvasRef: ElementRef;

  constructor() {
    this.eastWestRoadSegment = {
      id: 1,
      x: 1330,
      y: 201,
      width: 1020,
      height: 716
    }
    this.northSouthRoadSegment = {
      id: 2,
      x: 365,
      y: 660,
      width: 724,
      height: 1030
    }
    this.intersectionRoadSegment = {
      id: 3,
      x: 1305,
      y: 1053,
      width: 1080,
      height: 1396
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
    this.tileSetImage = new Image();
    this.tileSetImage.src = '../../assets/Road_test.png';
    this.tileSetImage.onload = () => this.drawBoard();
  }

  drawBoard() {
    var map = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    const tileSize = 32;
    const rowTileCount = map.length;
    const colTileCount = map[0].length;
    for (let r = 0; r < rowTileCount; r++) {
      for (let c = 0; c < colTileCount; c++) {
        const tile = map[r][c];
        // const tileRow = (tile/ image)
        if (tile > 0) {
          const tileSetCell = this.roadSegs[tile - 1]
          this.context.drawImage(this.tileSetImage, tileSetCell.x, tileSetCell.y, tileSetCell.width, tileSetCell.height, (c * tileSize), (r * tileSize), tileSize, tileSize);
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
