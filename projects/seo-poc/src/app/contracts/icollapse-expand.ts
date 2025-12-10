import { InjectionToken } from "@angular/core"
export type CE = "collapsed" | "expanded"
export interface ICollapse<T>{
	Collapse(param:T):void
	
}
export interface IExpand<T>{
	Expand(param:T):void 
}
export interface ICollapseExpand
{
	toggle(state:CE):void
	get state():CE
}
export const ICOLLAPSE = new InjectionToken<any>("ICOLLAPSE")
export const IEXPAND = new InjectionToken<any>("IEXPAND")
export const ICOLLAPSE_EXPAND = new InjectionToken<any>("ICOLLAPSE_EXPAND")

