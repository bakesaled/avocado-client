import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Img } from './classes/img';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ImageService {
  private imageLoadCount: number = 0;
  private htmlImages$: Subject<Array<HTMLImageElement>> = new Subject<Array<HTMLImageElement>>();

  public htmlImages: Array<HTMLImageElement> = [];
  public readonly htmlImagesObs: Observable<Array<HTMLImageElement>> = this.htmlImages$.asObservable();
  public images: Array<Img>;

  constructor() {
    const basePath = '../../assets/';
    this.images = [
      new Img(0, 'clover', 0, 0, 1024, 1024, basePath + 'textures/clover.jpg'),
      new Img(1, 'asphalt', 0, 0, 512, 512, basePath + 'textures/asphalt.png'),
      // new Img(1, 'road-eastwest', 0, 0, 256, 256, basePath + 'roads/roadEW.png'),
      new Img(2, 'road-northsouth', 0, 0, 256, 256, basePath + 'roads/roadNS.png'),
      new Img(3, 'road-intersection', 0, 0, 256, 256, basePath + 'roads/roadNEWS.png'),
      new Img(4, 'traffic-light-red', 1, 113, 414, 414, basePath + 'traffic-light.png'),
      new Img(5, 'car-red-up', -54, 0, 230, 230, basePath + 'vehicles/car_red_up.png'),
      new Img(6, 'car-red-down', -54, 0, 230, 230, basePath + 'vehicles/car_red_down.png'),
      new Img(7, 'car-red-left', 0, -54, 230, 230, basePath + 'vehicles/car_red_left.png'),
      new Img(8, 'car-red-right', 0, -54, 230, 230, basePath + 'vehicles/car_red_right.png')
    ]
  }

  load() {
    for (let i = 0; i < this.images.length; i++) {
      const image = new Image();
      image.name = this.images[i].name;
      image.onload = () => this.handleLoaded();
      image.src = this.images[i].path;
      this.htmlImages.push(image);
    }
  }

  private handleLoaded() {
    this.imageLoadCount++;

    if (this.imageLoadCount === this.images.length) {
      this.htmlImages$.next(this.htmlImages);
    }
  }
}
