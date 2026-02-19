import { CommonModule, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
export type CHANGE = 'positive' | 'negative' | 'neutral' ;
@Component({
  selector: 'stock-field',
  imports: [NgClass,CommonModule],
  templateUrl: './stock-field.component.html',
  styleUrl: './stock-field.component.css'
})
export class StockFieldComponent {
    label = input<string>("Entry")
    value = input<number>(0)
    change = input<CHANGE>('neutral') 

}
