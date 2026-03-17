import { Directive, forwardRef, signal, Signal, WritableSignal } from '@angular/core';
import { IPopupManager, POPUP_MANAGER } from './contract/IPopup';

@Directive({
  selector: 'notification',
  providers:[{provide:POPUP_MANAGER,useExisting:forwardRef(()=>PopupManagerDirective)}]
})
export class PopupManagerDirective implements IPopupManager {
  private topics:{[topic:string]:WritableSignal<boolean>} ={}
  constructor() { }
  registerUi(topic: string): WritableSignal<boolean> {
    if (!this.topics[topic])
    {
        this.topics[topic] = signal<boolean>(false) 
        
    }
    return this.topics[topic]
  }
  getTopic(topic: string): WritableSignal<boolean> {
    return this.topics[topic]
  }

}
