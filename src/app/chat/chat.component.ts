import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../core/chat.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'avocado-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private connection: Subscription;
  message: string;
  messages: Array<any> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
