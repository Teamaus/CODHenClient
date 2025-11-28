import { WritableSignal } from "@angular/core";
import { IPattern } from "./pattern.interface";

export interface IConfiguration{
	get data():WritableSignal<IPattern[]>
	flatData(data:IPattern[]):any[] 
	
}