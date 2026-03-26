import { Component } from '@angular/core';
import { ManualSelectDirective } from '../manual-select.directive';
import { AskDirective } from '../ask.directive';
import { AskComponent } from '../ask/ask.component';
import { ManualComponent } from '../manual/manual.component';
import { SelectAutoPopupComponent } from "../select-auto-popup/select-auto-popup.component";
import { AutoComponent } from '../auto/auto.component';
import { PublishService } from '../publish.service';

@Component({
  selector: 'app-test-pubsub',
  imports: [ AskComponent, ManualComponent, AutoComponent],
  templateUrl: './test-pubsub.component.html',
  styleUrl: './test-pubsub.component.css',
  providers:[PublishService]
})
export class TestPubsubComponent {
  constructor(private publisher:PublishService){

  }
  test_ask(){
    alert("Here")
    this.publisher.publish({data:{Products:["7856"]}},"ask","open")
  }
}
