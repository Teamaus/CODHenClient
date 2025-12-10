import { Component, Input } from '@angular/core';
import { ItemViewModel } from '../contracts/item';
import { ItemComponent } from '../item/item.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [ItemComponent,NgForOf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
      @Input() items:ItemViewModel[] = []
      updateAll(){
        this.items.forEach(item=>item.selected=true)
      }
      displayItems(){
        return JSON.stringify(this.items)
      }

      
}
