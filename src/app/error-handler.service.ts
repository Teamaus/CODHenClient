import { ErrorHandler, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemErrorService implements ErrorHandler {
  err = signal<any>(undefined)
  constructor() { }
  handleError(error: any): void {
    this.err.set(error)
  }
}
