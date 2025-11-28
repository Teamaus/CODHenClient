import { Component, input } from '@angular/core';

@Component({
  selector: 'stock-symbol',
  imports: [],
  templateUrl: './stock-symbol.component.html',
  styleUrl: './stock-symbol.component.css'
})
export class StockSymbolComponent {
  selected = input<boolean>(false);
  symbol = input<string>("AAPL");


}
