import { Directive, forwardRef, signal, WritableSignal } from '@angular/core';
import { IChatMessage, IPostMessage, IPublisher, IPubsub, ISubscriber, ITopic, PUBSUB, PUBSUB_SUBSCRIPTION } from './contract/INotification';
import { Subject } from 'rxjs';

@Directive({
  selector: 'notification',
  providers:[{provide:PUBSUB,useExisting:forwardRef(()=>PubSubDirective)}]
})
export class PubSubDirective implements IPubsub,IPostMessage {
  subscribers :{[topic:string]:Subject<IChatMessage>} = {}

  constructor() { }
  send(message: any,topic:string): void {
      if (this.subscribers[topic]){
        this.subscribers[topic].next(message)
      }
  }
  register_subscriber(subscriber: ISubscriber): PUBSUB_SUBSCRIPTION [] {

    const retval =  subscriber.topics.map(
      (topic:string)=>{
          console.log("REGISTER SUBSCRIBER:",subscriber)
          if (!this.subscribers[topic])
          {
            const resp$ = new Subject<IChatMessage>() 
            this.subscribers[topic] = resp$
            
          }
          return {resp$:this.subscribers[topic],topic} 
        }
      )
      console.log("SUBSCRIBERS:",this.subscribers)
      return retval 
    
  }
  register_publisher(publisher: IPublisher): IPostMessage {
    return this
  }

}
