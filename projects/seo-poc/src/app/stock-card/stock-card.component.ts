import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, input, model, ModelSignal, Output, Signal, ViewChild } from '@angular/core';
import { CodcodaButtonComponent } from '../codcoda-button/codcoda-button.component';
import { StockFieldComponent } from '../stock-field/stock-field.component';
import { StockSymbolComponent } from '../stock-symbol/stock-symbol.component';
import { StockDTO } from '../contracts/stock-dto';
import { StockSentenceComponent } from '../stock-sentence/stock-sentence.component';
import { ICOLLAPSE, ICollapse, ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { CollapseExpandComponent } from "../collapse-expand/collapse-expand.component";
import { StockDetailsDirective } from '../stock-details.directive';
import { StockCardViewModel } from '../contracts/stock-card-vm';

@Component({
  selector: 'codcoda-stock-card',
  imports: [CommonModule,
            CodcodaButtonComponent, 
            StockFieldComponent, 
            StockSymbolComponent, 
            StockDetailsDirective],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.css',
 

})
export class StockCardComponent {
  @ViewChild("details") details?:ElementRef<HTMLDetailsElement>
  @Input() stock:StockCardViewModel = {} as StockCardViewModel
  isSelected = model<boolean>(false)
  @Output() selection = new EventEmitter() 
  @Output() openChanged = new EventEmitter<StockCardViewModel>()
  //@ViewChild(ICOLLAPSE_EXPAND) ce?:ICollapseExpand
  ngOnInit(){
    console.log("STOCK:",this.stock)
  }
  hide(){
    if (this.details)
        this.details.nativeElement.open=false
  }
  toggleSelect(event:Event){
    
    event.stopPropagation()
    this.stock.selected = !this.stock.selected
    if (this.selection)
    {
        this.selection.emit() 
    }
  }
  collapse(){
      
    if (this.stock)
    {
      this.stock.open = false  
      this.openChanged.emit(this.stock)
    }
    
  }
  toggle(event:Event){
    
    if (this.details)
    {
        this.stock.open = this.details.nativeElement.open
        if (this.stock.open)
          this.stock.selected=true
        this.openChanged.emit(this.stock)
    }
  }
  tabRef: Window | null = null;

TradingView() {
  const url = `https://www.tradingview.com/symbols/${this.stock.symbol}`;

  // If already open and not closed -> focus it
  if (this.tabRef && !this.tabRef.closed) {
    this.tabRef.focus();
    return;
  }

  // Open (must be called from a user click)
  const name = `codcoda_${this.stock.symbol}`; // no spaces
  this.tabRef = window.open(url, name);

  if (!this.tabRef) {
    alert('Popup blocked (or browser refused a handle). Please allow popups for this site.');
    return;
  }
  

  // optional
  this.tabRef.focus();
}

  

}
