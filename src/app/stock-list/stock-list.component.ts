import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandColumn, EditService, GridModule, PageService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { PatternDataService } from '../pattern-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:true,
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports:[GridModule,NgForOf,CommonModule],
   providers: [EditService, ToolbarService,PageService,PatternDataService],
})
export class StockListComponent implements OnInit {
  attributes = []
 /* data :any= [
 {symbol:'AES',link:'https://www.tradingview.com/symbols/AES'},
{symbol:'ASTS',link:'https://www.tradingview.com/symbols/ASTS'},
{symbol:'GE',link:'https://www.tradingview.com/symbols/GE'},
{symbol:'BTI',link:'https://www.tradingview.com/symbols/BTI'},
{symbol:'CCJ',link:'https://www.tradingview.com/symbols/CCJ'},
{symbol:'NXT',link:'https://www.tradingview.com/symbols/NXT'},
{symbol:'BBIO',link:'https://www.tradingview.com/symbols/BBIO'},
{symbol:'EXEL',link:'https://www.tradingview.com/symbols/EXEL'},
{symbol:'INSM',link:'https://www.tradingview.com/symbols/INSM'},
{symbol:'LBRDK',link:'https://www.tradingview.com/symbols/LBRDK'},
{symbol:'AEHR',link:'https://www.tradingview.com/symbols/AEHR'},
{symbol:'URGN',link:'https://www.tradingview.com/symbols/URGN'},
{symbol:'OR',link:'https://www.tradingview.com/symbols/OR'},
{symbol:'NGG',link:'https://www.tradingview.com/symbols/NGG'},
{symbol:'ARQQ',link:'https://www.tradingview.com/symbols/ARQQ'},
{symbol:'MRCY',link:'https://www.tradingview.com/symbols/MRCY'},
 ]*/
data:any[] = []
 

   // ✅ Grid Edit Settings
  editSettings = { allowEditing: true, mode: 'Normal' };

  // ✅ Toolbar for editing
  toolbar = ['Edit', 'Update', 'Cancel'];
  
  constructor(private dataService:PatternDataService) { }
  
  ngOnInit(): void {
   
    this.dataService.getData("DATA_2025-07-22")
    .subscribe(
        resp=>this.parseData(resp)

    )
    
  }
  parseData(resp:any){
    
    const filtereddata = resp.filter((item:any)=>item.pattern=="cupandhandle")
    //item=>properties.reduce((acc,propObj)=>{return {...acc,[propObj.property]:item.result[propObj.property]}},{})
    const attributes = filtereddata[0].attributes
    const data = filtereddata[0].pattern_data.map((item:any)=>JSON.parse(item.pattern_result))
    const flat_data = data.map((item:any)=>attributes.reduce((acc:any,attribute:any)=>{return {...acc,[attribute]:item.result[attribute]}},item))
    this.data = flat_data
    this.attributes = attributes
    console.log(this.data[0].entry)
    
    
   

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
