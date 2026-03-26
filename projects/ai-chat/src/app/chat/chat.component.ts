import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './chat.models';
import { ChatService } from './chat.service';
import { SelectAutoPopupComponent } from '../select-auto-popup/select-auto-popup.component';
import { map, Observable, switchMap, take } from 'rxjs';
import { PopupService } from '../popup.service';
import { ApiListService } from '../api-list.service';
import { ResponseParserService } from '../response-parser.service';
import { RowGridPopupComponent } from '../row-grid-popup/row-grid-popup.component';
import { ManualDirective } from '../manual.directive';
import { IManual } from '../contract/IManual';
import { IPopupManager, POPUP_MANAGER } from '../contract/IPopup';

//הבא את פירטי המשנים בתיקי הלקוח : מזהה, סוג
function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,SelectAutoPopupComponent,RowGridPopupComponent,ManualDirective],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[PopupService,ApiListService,ResponseParserService]
  
})
export class ChatComponent {
  @ViewChild ('manual') manual?:IManual 
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
  ,private respParser:ResponseParserService
  ,@Inject(POPUP_MANAGER)public popupManager:IPopupManager
  ) {
     this.subscribeResponse()
  }
  onSelectionChanged(ids: string[]) {
      this.selectedIds = ids;
      console.log("Selected rows:", ids);
  }
  clone(obj:any):any
    {
      return {...obj}
    }
  api_continue(resp:any){
      
      
      this.chat.continueRequest(resp)

      
  }
  
  handleManual(resp:any)
  {
    ///Here we actually take the topic from resp and publish it 
    /// Then the relevant topic firesup 
      this.resp = resp 
      
      if (this.manual)
      {
        this.manual.open()
        this.manual.done$.pipe(take(1))
        .subscribe(
           resp=>{
            if (resp.action=="done")
            {
              
              const key = Object.keys(this.resp.params)[0]
              
              this.resp.params[key].value = resp.data.map((item:any)=>item[key])
              this.resp.params.continue = true
              this.api_continue(this.resp)

            }
            else
            {
              this.resp.params.continue = true 
              this.api_continue(this.resp)
              
            }
           }
        )
      }
  }
  handleAuto(resp:any)
  {

  }
  ask$():Observable<any>{
    
    return this.chat.ask$.pipe(
     
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
  subscribeResponse(){
    const ask$ = this.ask$()
    ask$.
    subscribe(
      {
        next:([applied,resp])=>{
          
          if (applied.mode=="manual")
          {

             
             this.handleManual(resp)
          }
          else
          {
            
            this.handleAuto(resp)
          }

        },
        complete:()=>console.log("Completed")
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
