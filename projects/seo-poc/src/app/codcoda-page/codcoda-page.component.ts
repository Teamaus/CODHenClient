import { Component, Inject } from '@angular/core';
import { CODCODA_PAGE, IPage, Pattern } from '../contracts/patterns';
import { StockCardListComponent } from '../stock-card-list/stock-card-list.component';
import { NgForOf, NgForOfContext } from '@angular/common';

@Component({
  selector: 'codcoda-page',
  imports: [StockCardListComponent,NgForOf],
  templateUrl: './codcoda-page.component.html',
  styleUrl: './codcoda-page.component.css'
})
export class CodcodaPageComponent {
  get patterns():Pattern[] 
  {
    return this.page.patterns
  }
  constructor(@Inject(CODCODA_PAGE)private page:IPage){
     
  }
  getSectors(){
    return this.page.sectors 
  }
  selectPattern(selectedPattern:Pattern)
  {
      
      console.log("Here OPEN:",this.selectPattern)
      this.patterns.forEach(pattern=>pattern!=selectedPattern?pattern.open.set(false):{})
  } 
  

}
