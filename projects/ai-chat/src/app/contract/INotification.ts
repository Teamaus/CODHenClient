import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export const NOTIFICATION = new InjectionToken<any>("NOTIFICATION")
export const PUBLISHER = new InjectionToken<any>("PUBLISHER")
export const SUBSCRIBER = new InjectionToken<any>("SUBSCRIBER")
export const PUBSUB = new InjectionToken<any>("PUBSUB")


export interface IPublisher{
	publish(resp:any,topic:string):void
	
}
export interface ISubscriber{
	subscribe():void
	get topic():string 
}
export interface IPostMessage{
	send(messaage:any,topic:string):void 
}
export interface IPubsub{
	register_subscriber(subscriber:ISubscriber):Observable<any>
	register_publisher(publisher:IPublisher):IPostMessage
}
