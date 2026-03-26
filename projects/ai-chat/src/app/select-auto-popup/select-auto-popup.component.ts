import { Component, EventEmitter, Inject, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../popup.service';
import { IPostMessage, IPublisher, IPubsub, PUBSUB } from '../contract/INotification';

export type StylesheetMode = 'auto' | 'manual';

@Component({
  selector: 'app-select-auto-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-auto-popup.component.html',
  styleUrls: ['./select-auto-popup.component.css'],
})
export class SelectAutoPopupComponent implements IPublisher {
  @Input() open = false;
  
  @Input() mode: StylesheetMode = 'auto';
  @Input() selectedId = '';
  @Input() options: Array<{ id: string; name: string }> = [];
  @Input() response:any 
  @Output() closed = new EventEmitter<void>();
  @Output() applied = new EventEmitter<{ mode: StylesheetMode; selectedId: string }>();
  postMessage:IPostMessage 
  constructor(private popupService:PopupService
              ,@Inject(PUBSUB) private pubsub:IPubsub)
              
  {
      this.postMessage = this.pubsub.register_publisher(this)

  }
  publish(resp: any, topic: string): void {
      if (this.postMessage)
      {
          this.postMessage.send(resp,topic)
      }
  }
  close() {
    this.popupService.popupClosed({ mode: this.mode, selectedId: this.selectedId })
    this.closed.emit();
  }

  apply() {
    this.applied.emit({ mode: this.mode, selectedId: this.selectedId });
    

    this.close() 
  }

  stop(e: MouseEvent) {
    e.stopPropagation();
  }
}