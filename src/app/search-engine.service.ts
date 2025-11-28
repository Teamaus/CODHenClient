import { Injectable } from '@angular/core';
const wordMatch = (word:string,what:string)=>new RegExp(`\\b${word}\\b`, "i").test(what);
@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  constructor() { }
  getPropValue(item:any,props:string[]):any{
      const [first,...rest] = props 
      if (rest.length==0)
        return item[first]
      else
      {
        return this.getPropValue(item[first],rest)
      }
  }
  searchByPropValue(data:any[],prop:any,what:any,exact=false):any[]
  {
      
      const props = prop.split(".")
      
      const filtered  = data.filter(item=>exact?what==this.getPropValue(item,props):wordMatch(this.getPropValue(item,props),what))
      console.log("FILTERED:",filtered.length,filtered)
      return filtered
  }
  searchByPattern(data:any[],pattern:any):any[]
  { 
      const ret = this.searchByPropValue(data,"parent.pattern",pattern)    
      return ret
  }
  searchBySymbol(data:any[],symbol:any):any[]
  {
    const ret = this.searchByPropValue(data,"symbol",symbol)     
    return ret

  }
  jsonSearch(obj:any,what:string):boolean{
     
    for (const key of Object.keys(obj))
    {
        
        if (key=="breakout-message")
        {
            console.log("BREAKOUT:",obj[key])
        }
        if (typeof obj[key] == "object")
        {
           if (this.jsonSearch(obj[key],what))
            return true
          else
            console.log("KEY: return:",key)
          
        }
        if (typeof obj[key]=="string")
        {
            if (what.includes(obj[key]))
                return true
        }
        
        
      
    }
    return false
    

  }
  searchInObj(obj:any,what:any):boolean{
    const ret = this.jsonSearch(obj.result.optional,what)
    return ret
  }
  symbols = ["AAPL","MSFT","GOOG"]
  getList(what:string,list:string[]):string[]{
        return list.filter(item=>wordMatch(item,what))

  } 
  joinData(symbolData:any[],patternData:any[]){
      if (patternData.length==0){

      }
  }
  search(data:any[],what:any):any[]{
      
      console.log("what",this.getList(what,this.symbols))
      const dataBySymbol = this.searchBySymbol(data,what)
      const dataByPattern  = this.searchByPattern(data,what)
      console.log("dataBySymbol",dataBySymbol)
      console.log("dataByPattern",dataByPattern)
      console.log("what",what)
      this.joinData(dataBySymbol,dataByPattern)
      if (what == "")
        return dataByPattern
      console.log("what",what)
      
      //We should take the keywords ... 
      
      return dataByPattern.filter(item=>
      {
            
        console.log("SEARCH ITEM>>>:",JSON.parse(item.pattern_result).result)
        const ret = this.searchInObj(JSON.parse(item.pattern_result),what)
        console.log("SEARCH RESULT:",ret)
        return ret
      })
    
  }
  
}
