import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodcodaButtonComponent } from './codcoda-button/codcoda-button.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { StockCardListComponent } from './stock-card-list/stock-card-list.component';
import { NgForOf } from '@angular/common';
import { TestEcComponent } from './test-ec/test-ec.component';
import { StockListComponent } from '../../../../src/app/stock-list/stock-list.component';
import { PatternsService } from './patterns.service';
import { StockCardViewModel } from './contracts/stock-card-vm';
import { Pattern } from './contracts/patterns';
import { PatternDataService } from '../../../../src/app/pattern-data.service';

@Component({
  selector: 'app-root',
  //imports: [TestEcComponent  ],
  imports:[StockCardListComponent,NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seo-poc';
  patterns:Pattern[] = [] 
  constructor(private patternsService:PatternsService){
      this.patterns = this.patternsService.patterns.patterns 
  }
  selectPattern(selectedPattern:Pattern)
  {
      
      console.log("Here OPEN:",this.selectPattern)
      this.patterns.forEach(pattern=>pattern!=selectedPattern?pattern.open.set(false):{})
  } 
  
  
}
