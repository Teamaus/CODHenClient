import { Component, computed, EventEmitter, forwardRef, HostListener, Input, input, model, ModelSignal, Output, QueryList, Signal, signal, ViewChild, ViewChildren, ɵunwrapWritableSignal } from '@angular/core';
import { StockDTO } from '../contracts/stock-dto';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { CollapseExpandComponent } from "../collapse-expand/collapse-expand.component";
import { CE, ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { StockCardViewModel } from '../contracts/stock-card-vm';
import { Pattern } from '../contracts/patterns';
import { DownloadButtonComponent } from "../download-button/download-button.component";
import { SortButtonComponent } from "../sort-button/sort-button.component";
import { SortComponent } from '../sort/sort.component';
import { FilterFromListComponent } from "../filter-from-list/filter-from-list.component";

@Component({
  selector: 'codcoda-stock-card-list',
  imports: [StockCardComponent, NgForOf, CollapseExpandComponent, NgIf, DownloadButtonComponent, SortComponent, FilterFromListComponent],
  templateUrl: './stock-card-list.component.html',
  styleUrl: './stock-card-list.component.css',
  providers:[{provide:ICOLLAPSE_EXPAND,useExisting:forwardRef(()=>StockCardListComponent)}]
})
export class StockCardListComponent {
sector = signal<string>("(All)")

sectorFilter($event: string) {
  this.sector.set($event)
}
  @ViewChild(CollapseExpandComponent) ce?:CollapseExpandComponent
  @Input() pattern:Pattern = {} as Pattern
  @Input() sectors:string[] = []
  stocks = signal(this.pattern.stocks)

  //pattern = input<string>("") 
  //@Input() stocks:StockCardViewModel[] = []
  @Output() selected  = new EventEmitter<Pattern>()
  
  close = computed(()=>this.pattern.open()?this.Close():{})
  
  filterCounter = 5
  sortStocks(sortby:{attribute:string,state:"asc"|"desc"}){
   
    console.log("STOCKS=> Before Sort",this.pattern.stocks[0],sortby)
      this.pattern.stocks = [...this.pattern.stocks.sort((a:StockCardViewModel,b:StockCardViewModel)=>this.sortComp(a,b,sortby))]
    console.log("STOCKS=> after Sort",this.pattern.stocks[0])  
      this.stocks.set(this.pattern.stocks)
  }
  construcator(){
     
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
  All = computed(()=>this.sector()=="(All)")
  filtered_stocks = computed(() => {
    let all = this.stocks()
    const sector = this.sector() 
    if (sector!="(All)")
    {

        all = this.stocks().filter(stock=>stock.sector==""?sector=="(Empty)":stock.sector==sector)
    }
    console.log("COMPUTED=>ALL:",all)
    if (!this.pattern.open()) {
      // show partial 
      console.log("Here:Closing",this.pattern.pattern)
      this.Close() 
      const retval = all.slice(0, this.filterCounter); 
      console.log("COMPUTED=>SLICE",retval)
      
      return all.slice(0, this.filterCounter);     // or whatever your rule is
    }
    
    // expanded → show all
    return all;
  });
  SelectionMessage(){
    return `${this.pattern.stocks.filter(stock=>stock.selected).length} selected`
  }
  sortComp(a:StockCardViewModel,b:StockCardViewModel,sortby:{attribute:string,state:"asc"|"desc"}):number
  {
      
      const obj1 = Object.fromEntries(a.attributes)
      const obj2 = Object.fromEntries(b.attributes)
      const sa = Object.fromEntries(a.sorted_attributes)
      const sb = Object.fromEntries(b.sorted_attributes)

      
      
      console.log("SORTCOMP:",sa[sortby.attribute],sb,sortby.attribute)
      return sortby.state=="asc"?sa[sortby.attribute]-sb[sortby.attribute]:sb[sortby.attribute]-sa[sortby.attribute] 
  }
  ngOnInit(): void {
    console.log("stocks in list:",this.pattern.stocks)
    const attribute =this.pattern.stocks[0].sorted_attributes[0][0]
    const state = "asc"
    this.sortStocks({attribute,state})
     console.log("stocks in list After sorting:",this.pattern.stocks)
  }
  export_to_csv(selected:boolean){
    const sector = this.sector() 
    let filtered = this.stocks()
    if (!this.All())
        filtered = this.stocks().filter(stock=>stock.sector==""?sector=="(Empty)":stock.sector==sector)
    const symbols = filtered.map(stock=>stock.symbol)
    if (symbols.length==0)
      return 
    const symbolsCsv = symbols.join("\r\n")
     const blob = new Blob([symbolsCsv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    console.log(today); // e.g. 2026-02-24
    a.href = url;
    const name = this.All()?"":sector
    a.download = `${this.pattern.pattern}.${today}.${name}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);    

    
  }
 
}
