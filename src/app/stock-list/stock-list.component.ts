import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandColumn, EditService, GridModule, PageService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  standalone:true,
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports:[GridModule,NgForOf],
   providers: [EditService, ToolbarService,PageService],
})
export class StockListComponent implements OnInit {
  attributes = []
  data :any= [
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
 ];

   // ✅ Grid Edit Settings
  editSettings = { allowEditing: true, mode: 'Normal' };

  // ✅ Toolbar for editing
  toolbar = ['Edit', 'Update', 'Cancel'];
  
  constructor() { }
  
  ngOnInit(): void {
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
