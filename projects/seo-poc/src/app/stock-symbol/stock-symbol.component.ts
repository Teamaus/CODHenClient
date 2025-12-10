import { Component, Inject, input } from '@angular/core';
import { ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { NgIf } from '@angular/common';

@Component({
  selector: 'stock-symbol',
 // imports: [NgIf],
  templateUrl: './stock-symbol.component.html',
  styleUrl: './stock-symbol.component.css'
})
export class StockSymbolComponent {
  
  selected = input<boolean>(false);
  symbol = input<string>("AAPL");
  constructor(@Inject(ICOLLAPSE_EXPAND)public details:ICollapseExpand)
  {

  }
  get stock_symbol_class(){
    let retval = "stock-symbol"
    if (this.details.state=="expanded")
        retval+=" open"
    console.log("STOCK_SYMBOL:",retval)
    return retval 
  }


}
