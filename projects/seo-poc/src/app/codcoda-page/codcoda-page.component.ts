import { Component, Inject, Signal } from '@angular/core';
import { CODCODA_PAGE, IPage, Pattern } from '../contracts/patterns';
import { StockCardListComponent } from '../stock-card-list/stock-card-list.component';
import { NgForOf, NgForOfContext } from '@angular/common';
import { CodcodaIdsComponent } from '../codcoda-ids/codcoda-ids.component';

@Component({
  selector: 'codcoda-page',
  imports: [StockCardListComponent,NgForOf,CodcodaIdsComponent],
  templateUrl: './codcoda-page.component.html',
  styleUrl: './codcoda-page.component.css'
})
export class CodcodaPageComponent {
  
  get patterns():Signal<Pattern[]>
  {
    return this.page.patterns
  }
  get ids():any[]
  {
    return this.page.ids
  }
  constructor(@Inject(CODCODA_PAGE)private page:IPage){
     
  }
  getSectors(){
    return this.page.sectors 
  }
  selectPattern(selectedPattern:Pattern)
  {
      
      console.log("Here OPEN:",this.selectPattern)
      this.patterns().forEach(pattern=>pattern!=selectedPattern?pattern.open.set(false):{})
  } 
  idChanged($event:any){
      this.page.PageChanged($event)
    
  }
  

}
