import { InjectionToken, ModelSignal, WritableSignal } from "@angular/core";
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
	
}

export const CODCODA_PAGE = new InjectionToken<any>("CODCODA_PAGE")

export interface IPage
{
	get patterns():Pattern[]
	get sectors():string[]
}
