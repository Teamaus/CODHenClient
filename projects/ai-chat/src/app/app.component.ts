import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { TestGridComponent } from './test-grid/test-grid.component';
import { ManualSelectDirective } from './manual-select.directive';
import { ChatPublisherDirective } from './chat-publisher.directive';
import { PubSubDirective } from './pub-sub.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent,ManualSelectDirective,ChatPublisherDirective,PubSubDirective],
  template: `
    <div class="shell">
      <notification><app-chat></app-chat></notification>
      <!--<test-app-row-grid></test-app-row-grid>-->
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
