import { Component, Inject } from '@angular/core';
import { PublishService } from '../publish.service';
import { ASK, CHAT_ACTION, ISubscriber, ITopic } from '../contract/INotification';
import { NgIf } from '@angular/common';
import { SelectAutoPopupComponent } from "../select-auto-popup/select-auto-popup.component";
import { PopupService } from '../popup.service';

@Component({
  selector: 'chat-ask',
  imports: [NgIf, SelectAutoPopupComponent],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.css',
  providers:[{provide:PublishService},PopupService]
})
export class AskComponent  {

constructor(@Inject(ASK) private ask:ISubscriber,private publisher:PublishService){
    console.log("ASK:",this.ask) 
    
}
apply(action:CHAT_ACTION) {
  alert(`Message:${JSON.stringify(this.ask.topicResponse('ask'))}`)
  this.publisher.publish(this.ask.topicResponse("ask"),"ask",action)
}
get show():boolean{

  return this.ask.topicAction("ask") == "open"
}

}
