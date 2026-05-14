import { EventEmitter, InjectionToken, ModelSignal, Signal, WritableSignal } from "@angular/core";
import { StockCardViewModel } from "./stock-card-vm";
import { StockDTO } from "./stock-dto";

export interface Patterns{
	patterns:Pattern[] 
}
export interface Pattern{
	open:WritableSignal<boolean>
	pattern:string,
	stocks:StockCardViewModel[] 
	sectors:string[]
	sorted_attributes:string[]
	save_stock_state?:boolean[] 
	about:any
	
}

export const CODCODA_PAGE = new InjectionToken<any>("CODCODA_PAGE")

export interface IPage
{
	get patterns():Signal<Pattern[]>
	get sectors():string[]
	get ids():any[] 
	PageChanged(id:any):void
}
