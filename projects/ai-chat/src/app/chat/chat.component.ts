import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './chat.models';
import { ChatService } from './chat.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectAutoPopupComponent } from '../select-auto-popup/select-auto-popup.component';

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,SelectAutoPopupComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  
})
export class ChatComponent {
  popup_open = false
  initialParams = {CustomerID:'C0001'};
  prompt = '';

  messages: ChatMessage[] = [
    { id: uid(), role: 'assistant', text: 'Hi — paste a prompt and I’ll respond (mock).', createdAt: Date.now(),initialParams:this.initialParams },
  ];

  isSending = false;

  constructor(private chat: ChatService,private cdr: ChangeDetectorRef) {}
  clone(obj:any):any
    {
      return {...obj}
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
    this.chat.send(req).subscribe({
      next: (res:any) => {
        if (res["type"] && res["type"]=="ask" )
        {
            this.popup_open = true
            this.isSending = false;
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
}
