import { Component, input } from '@angular/core';

@Component({
  selector: 'stock-sentence',
  imports: [],
  templateUrl: './stock-sentence.component.html',
  styleUrl: './stock-sentence.component.css'
})
export class StockSentenceComponent {
  sentence= input<string>("")
}
