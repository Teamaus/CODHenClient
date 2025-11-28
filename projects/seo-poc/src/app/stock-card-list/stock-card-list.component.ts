import { Component, input } from '@angular/core';
import { StockDTO } from '../contracts/stock-dto';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'codcoda-stock-card-list',
  imports: [StockCardComponent,NgForOf],
  templateUrl: './stock-card-list.component.html',
  styleUrl: './stock-card-list.component.css'
})
export class StockCardListComponent {
  stocks = input<StockDTO[]>([])
  ngOnInit(): void {
    console.log("stocks in list:",this.stocks())
  }
  first_stocks(){
    return this.stocks().slice(0,2);
  }
}
