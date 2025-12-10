import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-vm';
  items = [{name:"A",selected:false},{name:"B",selected:false},{name:"C",selected:false}]
  
}
