import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseParserService {

  constructor() { }
  getData(resp:any,outField:string)
  {
      const data  = resp.data.map((r:any)=>r.response[outField])
      const flat = data.reduce((acc:any[], curr:any) => acc.concat(curr), []);
      
      return flat 
  }
}
