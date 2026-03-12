import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './chat.models';
import { ChatService } from './chat.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectAutoPopupComponent } from '../select-auto-popup/select-auto-popup.component';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { PopupService } from '../popup.service';
import { ApiListService } from '../api-list.service';
import { ResponseParserService } from '../response-parser.service';
import { RowGridComponent } from '../row-grid/row-grid.component';
import { RowGridPopupComponent } from '../row-grid-popup/row-grid-popup.component';

//הבא את פירטי המשנים בתיקי הלקוח : מזהה, סוג
function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,SelectAutoPopupComponent,RowGridPopupComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[PopupService,ApiListService,ResponseParserService]
  
})
export class ChatComponent {
  popup_open = false
  row_grid_open = false 
  initialParams = {CustomerID:'C0001'};
  prompt = '';
  resp:any

  messages: ChatMessage[] = [
    { id: uid(), role: 'assistant', text: 'Hi — paste a prompt and I’ll respond (mock).', createdAt: Date.now(),initialParams:this.initialParams },
  ];

  isSending = false;
  selectedIds:string[] = []
  constructor(private chat: ChatService,private cdr: ChangeDetectorRef,
    private popupService:PopupService,private apiListService:ApiListService
  ,private respParser:ResponseParserService) {}
  onSelectionChanged(ids: string[]) {
      this.selectedIds = ids;
      console.log("Selected rows:", ids);
  }
  clone(obj:any):any
    {
      return {...obj}
    }
  api_continue(){
      alert("HERE...")
  }
  
  handleManual(resp:any)
  {
      
      this.resp = resp 
      this.row_grid_open = true 
      


  }
  handleAuto(resp:any)
  {

  }
  ask$():Observable<any>{
    
    return this.chat.ask$.pipe(
      take(1),
      switchMap(res=>this.open_popup$(res).pipe(
        take(1),
        map(applied=>[applied,res])))
    )

  }
  open_popup$(res:any):Observable<any>{
    
    this.popup_open = true
    this.isSending = false 
    this.respParser.getData(res,"PRODUCTS")
    const api = this.apiListService.getPrev(res.current,res.api_list)
    const outField = this.apiListService.outField(api.out_schema)
    const columns = this.apiListService.columns(api.out_schema,outField)
    console.log("COLUMNS:",columns,outField)
      
    return this.popupService.popup$
    
  }
  send() {
    const text = this.prompt.trim();
    if (!text || this.isSending) return;
    
    this.isSending = true;

    const userMsg: ChatMessage = { id: uid(), role: 'user', text, createdAt: Date.now(),initialParams:{...this.initialParams} };
    this.cdr.markForCheck();
    this.messages = [...this.messages, userMsg];
    this.prompt = '';
    
    const req = {
      initialParams: this.initialParams,
      messages: this.messages.map(m => ({ role: m.role, content: m.text })),
    };
    
    this.ask$()
    .subscribe(
      {
        next:([applied,resp])=>{
          
          if (applied.mode=="manual")
          {

             alert("MAN")
             this.handleManual(resp)
          }
          else
          {
            alert("AUT")
            this.handleAuto(resp)
          }

        },
        complete:()=>alert("Completed")
      }
    )
      
    
    this.chat.response$.subscribe({
      next: (res:any) => {
        if (res["type"] && res["type"]=="ask" )
        {
            this.popup_open = true
            //Here we add observanle for popup 
            this.isSending = false;
            
            console.log("RESP HERE:",res)
            return 
        }
        console.log('RECEIVED AT', Date.now(), res);
        const botMsg: ChatMessage = { id: uid(), role: 'assistant', text: JSON.stringify(res.content), createdAt: Date.now(),initialParams:{...this.initialParams} };
        this.messages = [...this.messages, botMsg];
        this.isSending = false;

        queueMicrotask(() => {
          const el = document.querySelector('.chat__messages') as HTMLElement | null;
          if (el) el.scrollTop = el.scrollHeight;
        });
      },
      error: (err) => {
        const errMsg: ChatMessage = { id: uid(), role: 'assistant', text: 'Error (mock): failed to reach server.'+err, createdAt: Date.now(),initialParams:{...this.initialParams}};
        this.messages = [...this.messages, errMsg];
        this.isSending = false;
      },
    });
    this.chat.sendRequest(req)
  }
  toEdit(text:string)
  {
      this.prompt = text
  }
  onKeydown(e: KeyboardEvent) {
    // Enter = send, Shift+Enter = newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }

  clear() {
    this.messages = [];
  }
  popup_apply(apply:any){
    console.log("APPLY:",apply)


  }
  closed(){
    this.popup_open = false 
  }
}
