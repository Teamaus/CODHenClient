import { Directive, forwardRef, Inject } from '@angular/core';
import { ChatService } from './chat/chat.service';
import { ChatRequest } from './chat/chat.models';
import { CHAT_ACTION, CHAT_SERVICE, IPublisher, IPubsub, PUBSUB } from './contract/INotification';
import { PublishService } from './publish.service';

@Directive({
  selector: '[chat-service]',
  providers:[{provide:CHAT_SERVICE,useExisting:forwardRef(()=>ChatServiceDirective)},PublishService]
})
export class ChatServiceDirective  {

  constructor(private chatService:ChatService
              ,private publishService:PublishService
              
  ) {
        
        this.chatService.ask$.subscribe(
          
          resp=>this.publishService.publish(resp,"ask","open") 
        )
        this.chatService.response$.subscribe
        (
        )
   }
   send(request:ChatRequest)
   {
      this.chatService.sendRequest(request)
   }
   

}
