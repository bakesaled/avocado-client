import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import * as io from 'socket.io-client';
import { ApiService } from './core/api.service';
import { ImageService } from './core/image.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'avocado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  private imagesSubscription: Subscription;
  public playerName: string;

  constructor(public auth: AuthService, private apiService: ApiService, private imageService: ImageService) {
    auth.handleAuthentication();
    apiService.connect(io);
    this.imagesSubscription = this.imageService.htmlImagesObs.subscribe((images) => {
      console.log('images loaded');
      apiService.getPlayerInfo().subscribe((name: string) => {
        console.log('player name', name);
        this.playerName = name;
      });
    });

    console.log('loading images');
    this.imageService.load();
  }

  ngOnDestroy() {
    this.imagesSubscription.unsubscribe();
  }
}
