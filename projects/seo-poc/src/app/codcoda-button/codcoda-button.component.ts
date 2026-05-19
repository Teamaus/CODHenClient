import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';


@Component({
  selector: 'codcoda-button',
  imports: [NgClass],
  templateUrl: './codcoda-button.component.html',
  styleUrl: './codcoda-button.component.css'
})
export class CodcodaButtonComponent {
  theme = input<string>("dark")
  @Input() src_path?:string// = "/button/icons/expand.svg"
  @Output() clickEvent = new EventEmitter() 
  clicked(event: MouseEvent){
      
      event.preventDefault
      event.stopPropagation()
      this.clickEvent.emit() 
  }
  ngOnInit(){
    
  }
}
