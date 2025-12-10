import { ModelSignal, WritableSignal } from "@angular/core";
import { StockCardViewModel } from "./stock-card-vm";
import { StockDTO } from "./stock-dto";

export interface Patterns{
	patterns:Pattern[] 
}
export interface Pattern{
	open:WritableSignal<boolean>
	pattern:string,
	stocks:StockCardViewModel[] 
	
}


