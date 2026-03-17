import { Directive, forwardRef, Inject } from '@angular/core';
import { IPostMessage, IPublisher, IPubsub, PUBLISHER, PUBSUB } from './contract/INotification';
import { ChatService } from './chat/chat.service';

@Directive({
  selector: 'notification',
  providers:[{provide:PUBLISHER,useExisting:forwardRef(()=>ChatPublisherDirective)}]
})
export class ChatPublisherDirective implements IPublisher{
  postMessage?:IPostMessage 
  constructor(@Inject(PUBSUB)private pubsub:IPubsub,private chatService:ChatService) {
      this.postMessage = this.pubsub.register_publisher(this)
      this.chatService.ask$.subscribe(resp=>this.publish(resp,"manual-select"))
      
   }
  publish(resp: any, topic: string): void {
      if (this.postMessage)
        this.postMessage.send(resp,topic)
  }

}
