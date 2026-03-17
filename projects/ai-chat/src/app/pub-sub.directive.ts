import { Directive, forwardRef } from '@angular/core';
import { IPostMessage, IPublisher, IPubsub, ISubscriber, PUBSUB } from './contract/INotification';
import { Observable, Subject } from 'rxjs';

@Directive({
  selector: 'notification',
  providers:[{provide:PUBSUB,useExisting:forwardRef(()=>PubSubDirective)}]
})
export class PubSubDirective implements IPubsub,IPostMessage {
  subscribers :{[topic:string]:Subject<any>} = {}

  constructor() { }
  send(message: any,topic:string): void {
      if (this.subscribers[topic]){
        this.subscribers[topic].next(message)
      }
  }
  register_subscriber(subscriber: ISubscriber): Observable<any> {
    
    if (!this.subscribers[subscriber.topic])
    {
        const subject = new Subject<any>() 
        this.subscribers[subscriber.topic] = subject
        
    }
    return this.subscribers[subscriber.topic]
  }
  register_publisher(publisher: IPublisher): IPostMessage {
    return this 
  }

}
