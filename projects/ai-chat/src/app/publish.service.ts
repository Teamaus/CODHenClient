import { Inject, Injectable } from '@angular/core';
import { CHAT_ACTION, IPostMessage, IPublisher, IPubsub, ITopic, PUBSUB } from './contract/INotification';

@Injectable()
export class PublishService implements IPublisher {
  postMessage?:IPostMessage
  constructor(@Inject(PUBSUB) private pubsub:IPubsub) { 
      this.postMessage = this.pubsub.register_publisher(this)
  }
  publish(message: any, topic: string,action:CHAT_ACTION): void {
      if (this.postMessage)
        this.postMessage.send({action,message,topic},topic)
      else
      {
        throw new Error("No Post Message on Publisher")
      }
  }
}
