import { Directive } from '@angular/core';
import { IManual } from './contract/IManual';
import { Observable, Subject, take } from 'rxjs';

@Directive({
  selector: 'manual',
  exportAs:"manual"
})
export class ManualDirective implements IManual {
  state : "auto" | "manual" =  "auto"
  _done$ = new Subject<any>()  
  constructor() { }
  get done$(): Observable<any> {
      return this._done$.pipe(take(1))
  }
  open()
  {
      
      this.state = "manual" 
  }
  close(resp:any)
  {
    this.state = "auto"
    this._done$.next(resp)
  }

}
