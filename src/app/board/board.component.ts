import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../core/image.service';
import { Img } from '../core/classes/img';
import { Subscription } from 'rxjs/Subscription';
import { BoardService } from '../core/board.service';

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
  
  @ViewChild('board') canvasRef: ElementRef;
  @ViewChild('lights') lightsCanvasRef: ElementRef;

  constructor(private imageService: ImageService, private boardService: BoardService) {
    this.imagesSubscription = this.imageService.htmlImagesObs.subscribe((images) => this.drawBoard(images));
  }

  ngOnInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.lightsContext = this.lightsCanvasRef.nativeElement.getContext('2d');

    this.boardSubscription = this.boardService.getBoardInfo().subscribe(boards => {
      console.log('got boards', boards);
      this.imageService.load();
    });
  }

  ngOnDestroy() {
    this.imagesSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
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
