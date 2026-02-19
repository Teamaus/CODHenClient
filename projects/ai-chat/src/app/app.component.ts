import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <div class="shell">
      <app-chat></app-chat>
    </div>
  `,
  styles: [`
    .shell{
      height: 100vh;
      padding: 18px;
      background:#070a10;
      display:flex;
    }
    app-chat{ flex:1; min-width: 320px; }
  `]
})
export class AppComponent {}
