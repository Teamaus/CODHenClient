import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import {delay, map, tap} from 'rxjs/operators'
import { ChatRequest, ChatResponse } from './chat.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http:HttpClient){}
  // Replace later with HttpClient POST to your MCP / model endpoint.
  send(req: ChatRequest): Observable<ChatResponse> {
    const lastUser = [...req.messages].reverse().find(m => m.role === 'user')?.content ?? '';
    
    const body = {"prompt":lastUser,"env_contracts":{"ENV_CONTRACTS":{"source_entities":["Customer"]}},initialParams:req.initialParams}
    return this.http.post("http://localhost:3003/mcp",body,{headers : {"content-type":"application/json"}}).pipe(tap(resp=>console.log("RESP:",resp)), map((resp:any)=>{return {role:'assistant',content:resp.response}})) as Observable<ChatResponse>
   
  }
}
