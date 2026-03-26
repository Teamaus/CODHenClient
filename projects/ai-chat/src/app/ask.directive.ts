import { computed, Directive, forwardRef, Inject, Signal } from '@angular/core';
import { ASK, ASK_TOPICS, IChatMessage, IPubsub, PUBSUB, PUBSUB_SUBSCRIPTION, SUBSCRIBER, TOPICS } from './contract/INotification';
import { ChatSubscriber } from './subscriber';
import { ICommResponse } from 'MCPContracts';
import { PublishService } from './publish.service';

@Directive({
  selector: 'notification',
  providers: [{provide:ASK,useExisting:forwardRef(()=>AskDirective)}
              ,{provide:ASK_TOPICS,useValue:["ask"]}
              ,PublishService
  ]
})
export class AskDirective extends ChatSubscriber  {
  
  constructor(@Inject(PUBSUB) pubsub:IPubsub,@Inject(ASK_TOPICS)topics:string[],private publisher:PublishService)
  {
    super(pubsub,topics)
  }
  override subscribe(obsCollection: PUBSUB_SUBSCRIPTION[]): void {
        obsCollection.forEach(
          ({resp$,topic})=>{
                  console.log("ASK:Subscribe Here",this.pubsub)
                  this.subscription.add(resp$.subscribe(
                      (resp:IChatMessage)=> {
                            alert(`We got a message:${JSON.stringify(resp)}`)
                            this._topicAction[topic] = resp.action 
                            this._topicResp[topic] = resp.message 
                            switch (resp.action)
                            {
                                case "cancel":
                                
                                  this.publisher.publish(this._topicResp[topic],"auto","open")
                                  break
                                case "close":
                                  this.publisher.publish(this._topicResp[topic],"manual","open")
                                  break
                                default:
                                  break
                            }
                            
                      })
        )
      })
    }
}
