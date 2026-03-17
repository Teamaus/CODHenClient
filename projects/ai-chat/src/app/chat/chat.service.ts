import { Injectable } from '@angular/core';
import {  Observable, of, Subject } from 'rxjs';
import {delay, map, tap} from 'rxjs/operators'
import { ChatRequest, ChatResponse } from './chat.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http:HttpClient){}
  // Replace later with HttpClient POST to your MCP / model endpoint.

  continueRequest(req:ChatRequest)
  {
      const body = req 
      this.send(body,"http://localhost:3003/mcp/continue")
    /*  console.log("Continue:",req)
       this.http.post("http://localhost:3003/mcp/continue",body,{headers : {"content-type":"application/json"}}).pipe(tap(resp=>console.log("RESP:",resp)), map((resp:any)=>{return resp.type=="ask"?resp:{role:'assistant',content:JSON.stringify(JSON.parse(resp.resp).response),type:resp.type}}))
    .subscribe(
      res=>{
        if (res.type=="ask")
        {
          alert("Send Ask...")
          this._ask$.next(res)
         // this._ask$.complete()
        }
        else
        {
          this._resposne$.next(res)
          this._resposne$.complete() 
        }
      }
    )*/
   
  }
  private send(body:any,url:string) {
    this.http.post(url,body,{headers : {"content-type":"application/json"}}).pipe(tap(resp=>console.log("RESP:",resp)), map((resp:any)=>{return resp.type=="ask"?resp:{role:'assistant',content:JSON.stringify(JSON.parse(resp.resp).response),type:resp.type}})) 
    .subscribe(
      res=>{
        if (res.type=="ask")
        {
          
          this._ask$.next(res)
        }
        else
        {
          console.log("RECEIVED ",res)
          this._resposne$.next(res)
        }
      }
    )
    
   
  }
  sendRequest(req:ChatRequest):void
  {
    const lastUser = [...req.messages].reverse().find(m => m.role === 'user')?.content ?? '';
    
    const body = {"prompt":lastUser,"env_contracts":{"ENV_CONTRACTS":{"source_entities":["Customer"]}},initialParams:req.initialParams}
    /*this.http.post("http://localhost:3003/mcp",body,{headers : {"content-type":"application/json"}}).pipe(tap(resp=>console.log("RESP:",resp)), map((resp:any)=>{return resp.type=="ask"?resp:{role:'assistant',content:JSON.stringify(JSON.parse(resp.resp).response),type:resp.type}}))
    .subscribe(
      res=>{
        if (res.type=="ask")
        {
          alert("Send Ask...")
          this._ask$.next(res)
         // this._ask$.complete()
        }
        else
        {
          this._resposne$.next(res)
          this._resposne$.complete() 
        }
      }
    )*/
    this.send(body, "http://localhost:3003/mcp")
    
   

  }
  private _ask$  = new Subject<any>()
  private _resposne$ = new Subject<any>() 
  get ask$():Observable<ChatResponse>{
    return this._ask$
  }
  get response$():Observable<ChatResponse>{
    return this._resposne$

  }

}
