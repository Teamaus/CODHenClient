import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PopupService {
  popup$ = new Subject<any>()
  constructor() { }
  popupClosed(applied:any)
  {
      this.popup$.next(applied)
      this.popup$.complete() 
  }
}
