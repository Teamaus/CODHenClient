import { StockDTO } from "./stock-dto";

export interface StockCardViewModel extends StockDTO
{
	selected:boolean ,
	open:boolean 
	saved_state:boolean
}