import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'cod-pattern',
  imports: [NgFor],
  templateUrl: './pattern.component.html',
  styleUrl: './pattern.component.css'
})


export class PatternComponent {
    pattern:any = input<any>({title: '## Cup and Handle', kind: 'stocks', stocks: [ 
                                {symbol: 'AAPL', url: 'https://www.tradingview.com/chart/?symbol=AAPL', note: 'resistance 246, handle forming', checked: false}
                                ,{symbol: 'MSFT', url: 'https://www.tradingview.com/chart/?symbol=MSFT', note: 'breakout above 398', checked: false}
                                ]
})
    toggleOpen = input<boolean>(false)
    constructor(){
      
    }
    ngOnInit(){
      console.log("PATTERN:",this.pattern())
    }
    
}
