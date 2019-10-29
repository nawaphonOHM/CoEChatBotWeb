import { Component, ViewChildren, QueryList } from '@angular/core';

import { ChatCoeService } from 'src/app/Services/chat-coe.service';
import { SentMessage } from 'src/app/Models/sent-message';
import { ShowMessage } from 'src/app/Models/show-message';


@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'], 
  providers: [ ChatCoeService ],
})
export class ChatBotComponent {

  messages: ShowMessage[] = [];
  @ViewChildren("Message") messageBox: QueryList<ShowMessage>;
  botImage: string = '../../assets/img/bot.jpeg';
  humenImage: string = '../../assets/img/humen.jpeg';
  botName: string = 'Coe Chat Bot';
  status: string = 'now';
  typingMessage: string = null;
  private state: string = null;
  inputPlaceholder: string = 'ต้องการจะถามอะไร';

  constructor(private chatService: ChatCoeService){
  }

  ngAfterViewInit(): void{
    let msgBox: Element = document.getElementsByClassName("msg-page")[0];

    this.messageBox.changes.subscribe(
      () => { msgBox.scrollTo(0, msgBox.scrollHeight); }
    )
  }

  enterKeyDown(event: KeyboardEvent): void{
    if(event.key === "Enter"){ this.sendMessage(); }
  }

  sendMessage(): void {
    if(this.typingMessage === null || this.typingMessage.length == 0){ 
      return; 
    }

    let newMessage: SentMessage = new SentMessage();
    let beforeSendMessage: ShowMessage = new ShowMessage();

    beforeSendMessage.msg = this.typingMessage;
    beforeSendMessage.sender = true;
    beforeSendMessage.time = Date.now();
    this.messages.push(beforeSendMessage);

    newMessage.msg = this.typingMessage;
    newMessage.sender = true;
    newMessage.state = this.state;

    this.chatService.send(newMessage).subscribe(
      (data: SentMessage): void => {
        let afterSendMessage = new ShowMessage();
        afterSendMessage.time = Date.now();
        afterSendMessage.sender = false;
        afterSendMessage.msg = data.msg;
        this.state = data.state;
        this.messages.push(afterSendMessage);
      }, 
      (error: any): void => { 
        console.log(error); 
      }, null);
    this.typingMessage = null;
  }
}
