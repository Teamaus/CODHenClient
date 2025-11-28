import { Component, input, model } from '@angular/core';
import { CodcodaButtonComponent } from '../codcoda-button/codcoda-button.component';
import { StockFieldComponent } from '../stock-field/stock-field.component';
import { StockSymbolComponent } from '../stock-symbol/stock-symbol.component';
import { StockDTO } from '../contracts/stock-dto';

@Component({
  selector: 'codcoda-stock-card',
  imports: [CodcodaButtonComponent,StockFieldComponent,StockSymbolComponent],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.css'
})
export class StockCardComponent {
  stock= input<StockDTO>({} as StockDTO)
  isSelected = model<boolean>(false)
  
  toggleSelect(){
     this.isSelected.set(!this.isSelected());
  }
  Collapse(event: MouseEvent){
    event.stopPropagation(); // so the summary / card click doesn't re-toggle it

    const target = event.target as HTMLElement;
    const details = target.closest('details') as HTMLDetailsElement | null;

    if (details) {
      details.open = false;  // ⬅️ closes the <details> directly
  }
   
  }


}
