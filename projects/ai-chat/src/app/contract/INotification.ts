import { InjectionToken, Signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";

export const NOTIFICATION = new InjectionToken<any>("NOTIFICATION")
export const PUBLISHER = new InjectionToken<any>("PUBLISHER")
export const SUBSCRIBER = new InjectionToken<any>("SUBSCRIBER")
export const PUBSUB = new InjectionToken<any>("PUBSUB")
export const CHAT_SERVICE = new InjectionToken<any>("CHAT_SERVICE")
export const TOPICS = new InjectionToken<any>("TOPICS")
export const MANUAL_TOPICS = new InjectionToken<any>("MANUAL_TOPICS")
export const ASK_TOPICS = new InjectionToken<any>("ASK_TOPICS")

export const ASK = new InjectionToken<any>("ASK")
export const MANUAL = new InjectionToken<any>("MANUAL")


export type CHAT_ACTION = "open"|"close"|"cancel"
export interface IChatMessage
{
	topic:string
	action:CHAT_ACTION
	message:any
}
export interface ITopic
{
	topic:string, 
	action:"open"|"close"|"cancel"
}
export interface IPublisher{
	publish(resp:any,topic:string,action:CHAT_ACTION):void
	
}
export interface ISubscriber{
	subscribe(obsCollection:PUBSUB_SUBSCRIPTION[]):void
	topicAction(topic:string):CHAT_ACTION
	get topics():string[] 
	topicResponse(topic:string):any
}

export interface IPostMessage{
	send(chatMessage:IChatMessage,topic:string):void 
}
export type PUBSUB_SUBSCRIPTION = {resp$:Observable<any>,topic:string}
export interface IPubsub{
	register_subscriber(subscriber:ISubscriber):PUBSUB_SUBSCRIPTION []
	register_publisher(publisher:IPublisher):IPostMessage
}


