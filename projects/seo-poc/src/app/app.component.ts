import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodcodaButtonComponent } from './codcoda-button/codcoda-button.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { StockCardListComponent } from './stock-card-list/stock-card-list.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [StockCardListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seo-poc';
  stocks=[{
    symbol:"AAPL",
    entry: 150,
    target: 200,
    target_profit: 50,
    stop_loss: 5,
    rr: 10,
    resistance: 180,
    support: 145,
    sentences: ["forming handle","breaking out"]
  },
  {
    symbol:"MSFT",
    entry: 250,
    target: 300,
    target_profit: 50,
    stop_loss: 8,
    rr: 8,
    resistance: 280,
    support: 245,
    sentences: ["forming cup","breaking out"]
  } ]
}
