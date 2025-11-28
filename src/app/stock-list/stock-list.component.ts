import { CommonModule, NgForOf } from '@angular/common';
import { Component, effect, ErrorHandler, Inject, input, OnInit, ViewChild } from '@angular/core';
import { CommandColumn, EditService, GridComponent, GridModule, PageService, SelectionService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { PatternDataService } from '../pattern-data.service';
import { IPattern } from '../contracts/pattern.interface';

@Component({
  standalone:true,
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports:[GridModule,NgForOf,CommonModule],
   providers: [EditService,ToolbarService,PageService,PatternDataService,SortService],
})
export class StockListComponent implements OnInit {
  @ViewChild(GridComponent) grid!:GridComponent
toggleChange(row: any) {
    
  let dataRow = this.data.find(row_=>row.symbol == row_.symbol)

  row.select = !row.select
  dataRow.select = row.select
   

}
pattern = input<IPattern>()
attributes :string[]= []
selectionSettings = { type: 'Multiple', mode: 'Row',checkboxOnly: false  };
data:any[] = []

 

   // ✅ Grid Edit Settings
   
  editSettings = { allowEditing: true, mode: 'Normal' };
  stackedHeaderRows:{stackedHeaderColumns:{headerText:string,column:string}[]}[]=[] 

  
  // ✅ Toolbar for editing
  toolbar = ['Edit', 'Update', 'Cancel'];
  
  constructor(private dataService:PatternDataService) { 
     
  }
  
  ngOnInit(): void {
    
      
    
   
    
  }
  ngAfterViewInit(){
    setTimeout(()=>this.parseData(),10)
    
  }
  onDataBound(){
    
    this.grid.autoFitColumns()
  }
  parseData(){
    const pattern = this.pattern()
    
    if (pattern)
    {
      //const flat = (attr:string,obj:any)=>(typeof obj[attr]==="object")?{[attr+"_close"]:obj[attr]["Close"],[attr+"_date"]:obj[attr]["Date"]}:{[attr]:obj[attr]}
      const flat = (attr:string,obj:any)=>(typeof obj[attr]==="object")?{[attr]:`${obj[attr].Close.toFixed(2)},${obj[attr].Date}`}:{[attr]:isNaN(obj[attr])?obj[attr]:obj[attr].toFixed(2)}
      const attributes = pattern.attributes.filter((attr:any)=>attr[1]==1).map((attr:any)=>attr[0])
      console.debug("ATTR",attributes)
      console.debug("PATTERN",pattern.pattern_data)
      const data = pattern.pattern_data.map((item:any)=>JSON.parse(item.pattern_result))
      let flat_data = data.map((item:any)=>attributes.reduce((acc:any,attribute:string)=>{const obj=flat(attribute,item.result);console.debug("===>>",JSON.stringify(obj));return {...acc,...obj}},item))
      console.log("DATA0===>>>:",data[0])
      console.debug("FLAT DATA",flat_data)
      this.data = flat_data.map((row:any)=>{return {...row,select:false}})
      console.debug("AAA",this.data[0].select)
      this.attributes = Object.keys(flat_data[8]).filter(key=>!["symbol","link","result"].includes(key))
      this.grid.autoFitColumns() 
      this.grid.refreshColumns() 
    }
  }
  private openTabs: { [symbol: string]: Window | null } = {}; 
  openTab(row:any){
    if (this.openTabs[row.symbol] && !this.openTabs[row.symbol]!.closed)
    {
        this.openTabs[row.symbol]!.focus()
    }
    else
        this.openTabs[row.symbol] = window.open(row.link,row.symbol)
  }

}
