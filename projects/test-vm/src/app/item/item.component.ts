import { Component, Input, input } from '@angular/core';
import { ItemViewModel } from '../contracts/item';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
    @Input() item:ItemViewModel = {} as ItemViewModel
    Toggle(){
      this.item.selected = !this.item.selected
    }
}
