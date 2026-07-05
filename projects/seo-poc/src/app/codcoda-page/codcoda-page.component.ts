import { Component, Inject, PLATFORM_ID, Signal } from '@angular/core';
import { CODCODA_PAGE, IPage, Pattern } from '../contracts/patterns';
import { StockCardListComponent } from '../stock-card-list/stock-card-list.component';
import { isPlatformBrowser, NgForOf, NgForOfContext } from '@angular/common';
import { CodcodaIdsComponent } from '../codcoda-ids/codcoda-ids.component';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'codcoda-page',
  imports: [StockCardListComponent,NgForOf,CodcodaIdsComponent],
  templateUrl: './codcoda-page.component.html',
  styleUrl: './codcoda-page.component.css'
})
export class CodcodaPageComponent {
 
  ngOnInit(){
    console.log("COMPONENT CREATED ")
  }
  get patterns():Signal<Pattern[]>
  {
    return this.page.patterns
  }
  get ids():any[]
  {
    return this.page.ids
  }
  constructor(@Inject(CODCODA_PAGE)private page:IPage,@Inject(PLATFORM_ID) private id:object){
     console.log(isPlatformBrowser(this.id)?"Created Component CLIENT":"Created SERVER")
     
  }
  ngOnDestroy(){
     console.log(isPlatformBrowser(this.id)?"Destroyed Component CLIENT":"Destroyed SERVER")
  }
  getSectors(){
    return this.page.sectors 
  }
  selectPattern(selectedPattern:Pattern)
  {
      this.restorePattern(selectedPattern)
      this.patterns().forEach(pattern=>pattern!=selectedPattern?this.closePattern(pattern):{})
  } 
  idChanged($event:any){
      this.page.PageChanged($event)
    
  }
closePattern(pattern:Pattern){
  
  pattern.open.set(false)
  pattern.stocks.forEach(stock=>{stock.open=false})
  
  

  ///We should save the states of the closing stock and re-open it ... 
}
restorePattern(pattern:Pattern)
{
  //pattern.stocks.forEach(stock=>stock.open=stock.saved_state)
}
  

}
