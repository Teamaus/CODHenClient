import {InjectionToken, Signal, WritableSignal} from '@angular/core'
export const POPUP_MANAGER = new InjectionToken<any>("POPUP_MANAGER")
export interface IPopup{
	
	registerUi(topic:string):Signal<boolean>
}
export interface IPopupManager{
	registerUi(topic:string):WritableSignal<boolean>
	getTopic(topic:string):WritableSignal<boolean>
}
