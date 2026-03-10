import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  constructor() { }
  outField(out_schema:string):string
  {
      return Object.keys(out_schema)[0]
  }
  columns(out_schema:any,outField:string){
    return [out_schema[outField]["field"]]
  }
  getPrev(current:any,apiList:any[]):any{
      const currentApi = apiList.find(api=>api.api_name==current)
      let  retval = undefined
      if (currentApi)
      {
          const index = apiList.indexOf(currentApi) 
          retval =  apiList[index-1]

      }
      return retval 
      

  }
}
