import { Directive, forwardRef, Inject, Signal, WritableSignal } from '@angular/core';
import { IPublisher, IPubsub, ISubscriber, PUBLISHER, PUBSUB, SUBSCRIBER } from './contract/INotification';
import { Subscription } from 'rxjs';
import { IPopupManager, POPUP_MANAGER } from './contract/IPopup';

@Directive({
  selector: 'notification',
  providers: [{provide:SUBSCRIBER,useExisting:forwardRef(()=>ManualSelectDirective),multi:true}]
})
export class ManualSelectDirective implements ISubscriber {
  subscription? : Subscription
  uiSignal?:WritableSignal<boolean>
  constructor(@Inject(PUBSUB)private pubsub:IPubsub,@Inject(POPUP_MANAGER)private popupManager:IPopupManager) { 
    this.subscribe()
    console.log("Notification:",this,this.pubsub)
    
  }
  get topic(): string {
      return "manual-select"
  }
  subscribe(): void {
       this.subscription = this.pubsub.register_subscriber(this).subscribe(
        resp=> {
                  console.log("UI needed to register and then the resp will show it ")
                  this.uiSignal?.set(true)
              }

      )
      this.uiSignal = this.popupManager.registerUi(this.topic)
  }

}
