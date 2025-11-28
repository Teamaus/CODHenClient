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
  } ,
{  symbol:"GOOGL",
    entry: 2700,
    target: 3000,
    target_profit: 300,
    stop_loss: 50,
    rr: 6,
    resistance: 2900,
    support: 2650,
    sentences: ["forming handle","breaking out"]
  },
{
  symbol:"AMZN",
    entry: 3300,
    target: 3600,
    target_profit: 300,
    stop_loss: 60,
    rr: 5,
    resistance: 3500,
    support: 3250,
    sentences: ["forming cup","breaking out"] 
}   ]
}
