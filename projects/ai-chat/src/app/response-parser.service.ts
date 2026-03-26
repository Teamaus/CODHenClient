import { Injectable } from '@angular/core';
import { ICommResponse } from 'MCPContracts';

@Injectable({
  providedIn: 'root'
})
export class ResponseParserService {

  constructor() { }
  getData(resp:ICommResponse,outField:string)
  {
      
      const data  = resp.body["data"].map((r:any)=>r.response[resp.prop])
      const parsed = data.reduce((acc:any[], curr:any) => acc.concat(curr), []);
      const manual = resp.manual
      return {manual,parsed}
  }
}
