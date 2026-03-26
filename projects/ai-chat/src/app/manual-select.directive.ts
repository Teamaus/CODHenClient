import { computed, Directive, forwardRef, Inject, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import {  IChatMessage, IPubsub, ISubscriber, MANUAL_TOPICS, PUBLISHER, PUBSUB, PUBSUB_SUBSCRIPTION, SUBSCRIBER, TOPICS } from './contract/INotification';
import { Subscription } from 'rxjs';
import { IPopupManager, POPUP_MANAGER } from './contract/IPopup';
import { ResponseParserService } from './response-parser.service';
import {ICommRequest, ICommResponse} from 'MCPContracts'
import { ChatSubscriber } from './subscriber';


@Directive({
  selector: 'notification',
  providers: [{provide:SUBSCRIBER,useExisting:forwardRef(()=>ManualSelectDirective)}
              ,{provide:MANUAL_TOPICS,useValue:["manual-select"]}
  ]
})
export class ManualSelectDirective extends ChatSubscriber implements OnDestroy {
  constructor(@Inject(PUBSUB) pubsub:IPubsub
             ,@Inject(POPUP_MANAGER)private popupManager:IPopupManager
             ,@Inject(MANUAL_TOPICS)  topics:string[]
             ,private respParser:ResponseParserService) {
      console.log("MANUAL TOPICS:",topics)  
      super(pubsub,topics) 
    
    
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe() 
  }
  
  subscribe(obsCollection:PUBSUB_SUBSCRIPTION[]): void 
  {
          obsCollection.forEach(
          ({resp$,topic})=>{
              
              this.subscription.add(resp$.subscribe(
                  (resp:IChatMessage)=> {
                        alert(`manual topic:${topic}`)
                        this._topicAction[topic] = resp.action 
                        if (resp.action=="open")
                        {
                          const message:ICommResponse = resp.message
                          this._topicResp[topic] = this.respParser.getData(message,message.prop)
                        }
              }))
        })
  }
  
}
