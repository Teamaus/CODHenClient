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



}
