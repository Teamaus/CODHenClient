import { InjectionToken, Signal } from "@angular/core"
export type CE = "collapsed" | "expanded"
export interface ICollapse<T>{
	Collapse(param:T):void
	
}
export interface IExpand<T>{
	Expand(param:T):void 
}
export interface ICollapseExpand
{
	toggle():void
	get state():Signal<CE>
	
}
export const ICOLLAPSE = new InjectionToken<any>("ICOLLAPSE")
export const IEXPAND = new InjectionToken<any>("IEXPAND")
export const ICOLLAPSE_EXPAND = new InjectionToken<any>("ICOLLAPSE_EXPAND")

// 	=>click=>we call toggle on the parent 
//  =>state is computed we get the computed on html. 
//
//