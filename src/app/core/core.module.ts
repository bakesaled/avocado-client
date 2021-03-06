import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ImageService } from './image.service';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ChatService,
    ImageService,
    ApiService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
