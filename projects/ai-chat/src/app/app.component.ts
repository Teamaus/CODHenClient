import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { TestGridComponent } from './test-grid/test-grid.component';
import { ManualSelectDirective } from './manual-select.directive';
import { ChatPublisherDirective } from './chat-publisher.directive';
import { PubSubDirective } from './pub-sub.directive';
import { PopupManagerDirective } from './popup-manager.directive';
import { TestPubsubComponent } from './test-pubsub/test-pubsub.component';
import { AskDirective } from './ask.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent,ManualSelectDirective,ChatPublisherDirective,PubSubDirective,PopupManagerDirective,TestPubsubComponent,PubSubDirective,
    ManualSelectDirective, AskDirective],
  
  template: `
    <div class="shell">
      <!--<notification><app-chat></app-chat></notification>-->
      <notification><app-test-pubsub></app-test-pubsub></notification>
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
