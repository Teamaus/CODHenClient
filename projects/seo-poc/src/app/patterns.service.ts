import { Injectable, model, signal } from '@angular/core';
import { Pattern, Patterns } from './contracts/patterns';
import { StockCardViewModel } from './contracts/stock-card-vm';

@Injectable({
  providedIn: 'root'
})
export class PatternsService {

  constructor() { 
      this.patterns.patterns = [] 
      const stocks:StockCardViewModel[] = [{
                                        symbol:"AAPL",
                                        entry: 150,
                                        target: 200,
                                        target_profit: 50,
                                        stop_loss: 5,
                                        rr: 10,
                                        resistance: 180,
                                        support: 145,
                                        sentences: ["forming handle","breaking out"],
                                        selected:false,
                                        open:false
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
                                        sentences: ["forming cup","breaking out"],
                                        selected:false,
                                        open:false

                                      } ,
                                    {  symbol:"GOOGL",
                                        entry: 2700,
                                        target: 3000,
                                        target_profit: 300,
                                        stop_loss: 50,
                                        rr: 6,
                                        resistance: 2900,
                                        support: 2650,
                                        sentences: ["forming handle","breaking out"],
                                        selected:false,
                                        open:false

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
                                        sentences: ["forming cup","breaking out"] ,
                                        selected:false,
                                        open:false
                                    }]
      const stocks2 = stocks.map(stock=>{return {...stock}})

      const pattern1:Pattern = {pattern:"cupandhandle",stocks:[...stocks],open:signal<boolean>(false)}
      const pattern2:Pattern = {pattern:"cupandhandle_2",stocks:[...stocks2],open:signal<boolean>(false)}
      this.patterns.patterns = [...this.patterns.patterns,pattern1]
      console.log("PATTERNS:",pattern1.stocks[0]===pattern2.stocks[0])
      this.patterns.patterns = [...this.patterns.patterns,pattern2]
      

  }
  patterns:Patterns  = {} as Patterns
}
