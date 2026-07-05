import { Inject, Injectable, model, PLATFORM_ID, signal } from '@angular/core';
import { Pattern, Patterns } from './contracts/patterns';
import { StockCardViewModel } from './contracts/stock-card-vm';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
const url = "/api/patterns"
//const url = "/patterns"
let sid = 0 
@Injectable()
export class PatternsService {
  extractStock(item:any,chart_attributes:string[],sorted_attribute_names:string[]):StockCardViewModel{
      
      const result = JSON.parse(item.pattern_result)
      console.log("RESULT===>>",result,"attributes",chart_attributes)
      const attribute_entries = chart_attributes.map(attrName=>[attrName,result.result[attrName]])
      const sorted_attribute_entries = sorted_attribute_names.map(attrName=>[attrName,result.result[attrName]])
      const attributes = attribute_entries
      const sorted_attributes = sorted_attribute_entries
          console.log("RESULT===>>2",attributes)
      return {attributes,
        sorted_attributes,
        id:result.id,
        symbol: item.symbol, entry: result.result.entry, target: result.result["target-profit"],rank:result.result["rank-last"],
        sma_150:result.result["sma-last-close"],
        sector:item.Sector,
        selected: false,
        open: false,
        saved_state:false,
 
  
        target_profit: result.result["target-profit"]/result.result.entry,
        stop_loss: result.result["stop-loss"],
        rr: 5,
        resistance: result.result["optional"]["resistance"],
        support: result.result["optional"]["support"],
  
        sentences: [],
  
  
}
  }
  //pattern_result



  extractData(resp:any)
  { 
      console.log("Before filtering",resp)
      
      //const ret = resp.filter(itemresp=>itemresp.pattern==spattern) 
      console.log("RESP2:",resp)
      const pattern_data = resp.pattern_data
      
      const stocks = pattern_data.map((item:any)=>this.extractStock(item,resp.attributes.map((attr:any)=>attr[0]),resp.sorted_attributes.map((attr:any)=>attr[0])))
      const pattern:any ={pattern:resp.pattern,stocks:[...stocks],open:signal<boolean>(false)}
      pattern.sectors = stocks.reduce((acc:Set<string>,curr:any)=>acc.add(curr.sector!=""?curr.sector:"(Empty)"),new Set<string>())
      pattern.sectors = [...pattern.sectors,"(All)"].sort()
      pattern.sorted_attributes = resp.sorted_attributes.map((attr:any)=>attr[0])
      console.log("RET:",pattern.sectors,pattern.sorted_attributes)
      pattern.about = resp.about
      return pattern
  }
  getPatterns(id:string="DATA_ALL"){
    console.time('getPatterns')
         this.http.get(`${url}?id=${id}`, {
  withCredentials: true
})
      .subscribe(
        (resp:any)=>
          {
             console.timeEnd('getPatterns') 
            console.log("RESP:",resp)
            let ret:any[] = [] 
            for(const r of resp.patterns as any[])
            {
              const pattern = this.extractData(r)
              console.log("Pattern:",pattern)
              ret  = [...ret,pattern]
 
            }
           
            this.patterns.set(ret)
            this.ids = resp.ids
          }
      )
      

 

  }
  constructor(private http:HttpClient,@Inject(PLATFORM_ID)  platformId: Object) { 
      console.log("getPatterns() instance ",platformId)
      ++sid
      if (!isPlatformServer(platformId))
      {
         console.log("getPatterns() calling ")
         this.getPatterns()
      }
  }
  patterns = signal<any[]>([]) 
  sectors = []
  ids:any[] = []
}