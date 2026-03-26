import { Subscription } from "rxjs";
import { CHAT_ACTION, IPubsub, ISubscriber, ITopic, PUBSUB_SUBSCRIPTION } from "./contract/INotification";
import { signal, Signal, WritableSignal } from "@angular/core";

export abstract class ChatSubscriber implements ISubscriber {
	subscription = new  Subscription()
	_topicAction:{[topic:string]:CHAT_ACTION} = {}
  	_topicResp:{[topic:string]:any}={}

	abstract subscribe(obsCollection:PUBSUB_SUBSCRIPTION[]):void
	constructor(protected pubsub:IPubsub,private _topics:string[])
	{ 
		
		const obsCollection = this.pubsub.register_subscriber(this)

    	this.subscribe(obsCollection)
    	console.log("Notification:",this,this.pubsub)
    }
	topicAction(topic: string): CHAT_ACTION {
		return this._topicAction[topic]
	}
	topicResponse(topic: string) {
		return this._topicResp[topic]
	}
	
	get topics(): string[]
	{
		return this._topics
	}
	
	

  

}
