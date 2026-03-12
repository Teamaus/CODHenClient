import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../popup.service';

export type StylesheetMode = 'auto' | 'manual';

@Component({
  selector: 'app-select-auto-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-auto-popup.component.html',
  styleUrls: ['./select-auto-popup.component.css'],
})
export class SelectAutoPopupComponent {
  @Input() open = false;

  @Input() mode: StylesheetMode = 'auto';
  @Input() selectedId = '';
  @Input() options: Array<{ id: string; name: string }> = [];

  @Output() closed = new EventEmitter<void>();
  @Output() applied = new EventEmitter<{ mode: StylesheetMode; selectedId: string }>();
  constructor(private popupService:PopupService)
  {

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