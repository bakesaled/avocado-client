import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import { AuthService } from './auth.service';
import { BoardComponent } from './board/board.component';
import { TilesPanelComponent } from './tiles-panel/tiles-panel.component';
import { StatSheetComponent } from './stat-sheet/stat-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    BoardComponent,
    TilesPanelComponent,
    StatSheetComponent
  ],
  imports: [
    routing,
    BrowserModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
