import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, input, model, ModelSignal, Output, Signal, ViewChild } from '@angular/core';
import { CodcodaButtonComponent } from '../codcoda-button/codcoda-button.component';
import { StockFieldComponent } from '../stock-field/stock-field.component';
import { StockSymbolComponent } from '../stock-symbol/stock-symbol.component';
import { StockDTO } from '../contracts/stock-dto';
import { StockSentenceComponent } from '../stock-sentence/stock-sentence.component';
import { ICOLLAPSE, ICollapse, ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { NgFor, NgForOf } from '@angular/common';
import { CollapseExpandComponent } from "../collapse-expand/collapse-expand.component";
import { StockDetailsDirective } from '../stock-details.directive';
import { StockCardViewModel } from '../contracts/stock-card-vm';

@Component({
  selector: 'codcoda-stock-card',
  imports: [CodcodaButtonComponent, StockFieldComponent, StockSymbolComponent, CollapseExpandComponent,StockDetailsDirective],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.css',
 

})
export class StockCardComponent {
  @ViewChild("details") details?:ElementRef<HTMLDetailsElement>
  @Input() stock:StockCardViewModel = {} as StockCardViewModel
  isSelected = model<boolean>(false)
  @Output() selection = new EventEmitter() 
  //@ViewChild(ICOLLAPSE_EXPAND) ce?:ICollapseExpand
  toggleSelect(event:Event){
    event.stopPropagation()
    this.stock.selected = !this.stock.selected
    if (this.selection)
    {
        this.selection.emit() 
    }
  }
  collapse(){
    console.log("COLLAPSE")
    if (this.stock)
    {
      this.stock.open = false  
    }
    
  }
  toggle(event:Event){
  
    if (this.details)
    {
        this.stock.open = this.details.nativeElement.open
    }
  }
  
  

}
