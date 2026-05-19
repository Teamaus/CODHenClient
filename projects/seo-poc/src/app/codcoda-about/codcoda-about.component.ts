import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-codcoda-about',
  imports: [NgIf],
  templateUrl: './codcoda-about.component.html',
  styleUrl: './codcoda-about.component.css'
})
export class CodcodaAboutComponent {
  @Input() title = ""
  @Input() about = "" 
  @Output() hide_about = new EventEmitter() 
  show_about = false
  
}
