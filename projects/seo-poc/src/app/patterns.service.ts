import { Injectable, model, signal } from '@angular/core';
import { Pattern, Patterns } from './contracts/patterns';
import { StockCardViewModel } from './contracts/stock-card-vm';
import { HttpClient } from '@angular/common/http';
const url = "http://localhost:3000/patterns"
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
      
      //const pattern = {pattern:ret[0].patter}
     console.log("RET:",stocks,this.sectors)
      
      return pattern
  }
  constructor(private http:HttpClient) { 
      
      this.http.get(`${url}?id=DATA_2026-01-13`, {
  withCredentials: true
})
      .subscribe(
        resp=>
          { 
            console.log("RESP:",resp)
            let ret:any[] = [] 
            for(const r of resp as any[])
            {
              const pattern = this.extractData(r)
              console.log("Pattern:",pattern)
              ret  = [...ret,pattern]
              
            }
            this.patterns.set(ret)
          }
      )
      /*const stocks:StockCardViewModel[] = [{
                                        symbol:"AAPL",
                                        entry: 150,
                                        target: 200,
                                        target_profit: 50,
                                        stop_loss: 5,
                                        rr: 10,
                                        resistance: 180,
                                        support: 145,
                                        sentences: ["forming handle","breaking out"],
                                        selected:false,
                                        open:false
                                      },
                                      {
                                        symbol:"MSFT",
                                        entry: 250,
                                        target: 300,
                                        target_profit: 50,
                                        stop_loss: 8,
                                        rr: 8,
                                        resistance: 280,
                                        support: 245,
                                        sentences: ["forming cup","breaking out"],
                                        selected:false,
                                        open:false

                                      } ,
                                    {  symbol:"GOOGL",
                                        entry: 2700,
                                        target: 3000,
                                        target_profit: 300,
                                        stop_loss: 50,
                                        rr: 6,
                                        resistance: 2900,
                                        support: 2650,
                                        sentences: ["forming handle","breaking out"],
                                        selected:false,
                                        open:false

                                      },
                                    {
                                      symbol:"AMZN",
                                        entry: 3300,
                                        target: 3600,
                                        target_profit: 300,
                                        stop_loss: 60,
                                        rr: 5,
                                        resistance: 3500,
                                        support: 3250,
                                        sentences: ["forming cup","breaking out"] ,
                                        selected:false,
                                        open:false
                                    }]
      const stocks2 = stocks.map(stock=>{return {...stock}})

      const pattern1:Pattern = {pattern:"cupandhandle",stocks:[...stocks],open:signal<boolean>(false)}
      const pattern2:Pattern = {pattern:"cupandhandle_2",stocks:[...stocks2],open:signal<boolean>(false)}
      this.patterns.patterns = [...this.patterns.patterns,pattern1]
      console.log("PATTERNS:",pattern1.stocks[0]===pattern2.stocks[0])
      this.patterns.patterns = [...this.patterns.patterns,pattern2]*/
      

  }
  patterns = signal<any[]>([]) 
  sectors = []
}