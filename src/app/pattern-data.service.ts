import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url = "http://localhost:3000/patterns"
@Injectable()
export class PatternDataService {

  constructor(private http:HttpClient) { 
    
  }
  getData(id:string):Observable<Object>{
    alert(url+"?id="+id)
    return this.http.get(url+"?id="+id)
    
  }
}
