import { Component, computed, EventEmitter, forwardRef, HostListener, Input, input, model, ModelSignal, Output, QueryList, Signal, signal, ViewChild, ViewChildren } from '@angular/core';
import { StockDTO } from '../contracts/stock-dto';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { CollapseExpandComponent } from "../collapse-expand/collapse-expand.component";
import { CE, ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { StockCardViewModel } from '../contracts/stock-card-vm';
import { Pattern } from '../contracts/patterns';

@Component({
  selector: 'codcoda-stock-card-list',
  imports: [StockCardComponent, NgForOf, CollapseExpandComponent,NgIf],
  templateUrl: './stock-card-list.component.html',
  styleUrl: './stock-card-list.component.css',
  providers:[{provide:ICOLLAPSE_EXPAND,useExisting:forwardRef(()=>StockCardListComponent)}]
})
export class StockCardListComponent {
  @ViewChild(CollapseExpandComponent) ce?:CollapseExpandComponent
  @Input() pattern:Pattern = {} as Pattern
  //pattern = input<string>("") 
  //@Input() stocks:StockCardViewModel[] = []
  @Output() selected  = new EventEmitter<Pattern>()
  close = computed(()=>this.pattern.open()?this.Close():{})
  
  filterCounter = 5
  
  constructor(){
    
  }
  largeList(){
    return this.pattern.stocks.length>this.filterCounter
  }
  Close(){
     this.pattern.stocks.forEach(stock=>stock.open = false)
    
  }
  toggle()
  {
     
      if (this.pattern.open())
      {
          this.Close() 
      }
      else
      {
          
          console.log("Selected:",this.selected)
          this.selected.emit(this.pattern)
      }
      console.log(this.pattern.stocks)
      
      this.ce?.toggle()   
       this.pattern.open.set(!this.pattern.open())
  
  }
  
  filtered_stocks = computed(() => {
    const all = this.pattern.stocks
    
    if (!this.pattern.open()) {
      // show partial list
      console.log("Here:Closing",this.pattern.pattern)
      this.Close() 
      return all.slice(0, this.filterCounter);     // or whatever your rule is
    }

    // expanded → show all
    return all;
  });
  SelectionMessage(){
    return `${this.pattern.stocks.filter(stock=>stock.selected).length} selected`
  }

  ngOnInit(): void {
    console.log("stocks in list:",this.pattern.stocks)
    
  }
  export_to_csv(selected:boolean){
    
    const symbols = !selected?this.pattern.stocks.map(stock=>stock.symbol):this.pattern.stocks.filter(stock=>stock.selected).map(stock=>stock.symbol)
    if (symbols.length==0)
      return 
    const symbolsCsv = symbols.join("\r\n")
     const blob = new Blob([symbolsCsv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    console.log(today); // e.g. 2026-02-24
    a.href = url;
    a.download = `${this.pattern.pattern}.${today}${selected?".selected":""}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);    

    
  }
 
}
