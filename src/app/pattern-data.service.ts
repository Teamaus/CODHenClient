import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
const url = "https://codcoda.backend.local/patterns"
@Injectable()
export class PatternDataService {

  constructor(private http:HttpClient) { 
    
  }
  getData(id:string){
    alert(url+"?id="+id)
    this.http.get(url+"?id="+id)
    .subscribe(
    
      resp=>{
              console.debug("RESP:>>>",(resp as any[])[0].pattern_data[0].pattern_result)
              const obj = JSON.parse((resp as any[])[0].pattern_data[0].pattern_result)
              console.log("OPTIONAL:==>>>",obj.result.optional)
                 
             
              
              this._data.set(resp as any)

      }
    )
    
    
  }
  private _data = signal<any>(null)
  get data():WritableSignal<any>{
    return this._data
  }
}
