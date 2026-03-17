import { Observable } from "rxjs"

export interface IManual
{
	open():void
	close(resp:any):void
	get state():"auto"|"manual"
	get done$():Observable<any>
}
