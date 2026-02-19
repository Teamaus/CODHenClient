import { Component, effect, Input } from '@angular/core';
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

import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  //imports: [TestEcComponent  ],
  imports:[StockCardListComponent,NgForOf],
  providers:[PatternsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seo-poc';
  patterns:Pattern[] = [] 
  constructor(private patternsService:PatternsService){
      effect (()=>this.patterns = this.patternsService.patterns())
  }
  selectPattern(selectedPattern:Pattern)
  {
      
      console.log("Here OPEN:",this.selectPattern)
      this.patterns.forEach(pattern=>pattern!=selectedPattern?pattern.open.set(false):{})
  } 
  
  
}
