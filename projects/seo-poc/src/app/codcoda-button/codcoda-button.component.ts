import { NgClass } from '@angular/common';
import { Component, EventEmitter, input } from '@angular/core';


@Component({
  selector: 'codcoda-button',
  imports: [NgClass],
  templateUrl: './codcoda-button.component.html',
  styleUrl: './codcoda-button.component.css'
})
export class CodcodaButtonComponent {
  theme = input<string>("dark")
  clickEvent = new EventEmitter() 
  clicked(event: MouseEvent){
      event.stopPropagation()
      this.clickEvent.emit() 
  }
}
